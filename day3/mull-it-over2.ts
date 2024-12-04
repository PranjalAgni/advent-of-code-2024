import path from "path";
import { readInput } from "../utils/data";

function multiply(mulStr: string) {
  const numbers = mulStr.split("mul(")[1].replace(")", "");
  const [a, b] = numbers.split(",").map((x) => parseInt(x));
  return a * b;
}

interface IMergedList {
  op: "mul" | "do" | "dont";
  start: number;
  end: number;
}

function mergeAllList(list1: Array<[number, number]>, list2: Array<[number, number]>, list3: Array<[number, number]>) {
  const mergedList: Array<IMergedList> = [];

  let p = 0;
  let q = 0;
  let r = 0;

  while (p < list1.length || q < list2.length || r < list3.length) {
    const x = list1[p];
    const y = list2[q];
    const z = list3[r];

    if (x) {
      mergedList.push({ op: "mul", start: x[0], end: x[1] });
      p += 1;
    }
    if (y) {
      mergedList.push({ op: "do", start: y[0], end: y[1] });
      q += 1;
    }
    if (z) {
      mergedList.push({ op: "dont", start: z[0], end: z[1] });
      r += 1;
    }
  }

  return mergedList.sort((a, b) => a.start - b.start);
}
function findAndMultiply(text: string) {
  const mulRegex = /mul\(\d+,\d+\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don\'t\(\)/g;

  const matches: Array<[number, number]> = [];
  const doMatches: Array<[number, number]> = [];
  const dontMatches: Array<[number, number]> = [];

  let match = mulRegex.exec(text);
  while (match) {
    const start = match.index;
    const end = mulRegex.lastIndex;
    matches.push([start, end]);
    match = mulRegex.exec(text);
  }

  match = doRegex.exec(text);
  while (match) {
    const start = match.index;
    const end = doRegex.lastIndex;
    doMatches.push([start, end]);
    match = doRegex.exec(text);
  }

  match = dontRegex.exec(text);
  while (match) {
    const start = match.index;
    const end = dontRegex.lastIndex;
    dontMatches.push([start, end]);
    match = dontRegex.exec(text);
  }

  const mergedList = mergeAllList(matches, doMatches, dontMatches);
  let answer = 0;
  let isMulEnabled = true;
  for (const obj of mergedList) {
    if (obj.op === "mul" && isMulEnabled) {
      answer += multiply(text.slice(obj.start, obj.end));
    } else if (obj.op === "do") {
      isMulEnabled = true;
    } else if (obj.op === "dont") {
      isMulEnabled = false;
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);
const answer = findAndMultiply(inputData);
console.log("Answer is here", answer);
