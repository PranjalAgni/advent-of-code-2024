import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function isSafe(list: number[]) {
  const N = list.length;
  const isIncreasing = list[0] <= list[1];
  for (let i = 1; i < N; i++) {
    const delta = Math.abs(list[i - 1] - list[i]);
    if (delta < 1 || delta > 3) return false;
    if (isIncreasing && list[i - 1] > list[i]) return false;
    else if (!isIncreasing && list[i - 1] < list[i]) return false;
  }

  return true;
}

function countSafeReports(inputData: string[]) {
  let answer = 0;
  for (const row of inputData) {
    const list = row.split(" ").map((x) => parseInt(x));
    if (isSafe(list)) answer += 1;
  }
  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = countSafeReports(inputData);
console.log("Answer is here", answer);
