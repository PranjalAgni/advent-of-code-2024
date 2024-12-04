import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function findPattern(list: number[]) {
  const N = list.length;
  let increasing = 0;
  let decreasing = 0;
  for (let idx = 1; idx < N; idx++) {
    if (list[idx - 1] <= list[idx]) {
      increasing += 1;
    } else {
      decreasing += 1;
    }
  }

  return increasing > decreasing;
}
function isSafe(list: number[]) {
  const N = list.length;
  const isIncreasing = findPattern(list);
  for (let idx = 1; idx < N; idx++) {
    const delta = Math.abs(list[idx - 1] - list[idx]);
    if (delta < 1 || delta > 3) return idx;

    if (isIncreasing && list[idx - 1] > list[idx]) return idx;
    else if (!isIncreasing && list[idx - 1] < list[idx]) return idx;
  }

  return -1;
}

function countSafeReports(inputData: string[]) {
  let answer = 0;
  for (const row of inputData) {
    const list = row.split(" ").map((x) => parseInt(x));
    const pos = isSafe(list);
    if (pos !== -1) {
      const x = list.toSpliced(pos, 1);
      const y = list.toSpliced(pos - 1, 1);

      if (isSafe(x) === -1 || isSafe(y) === -1) {
        answer += 1;
      }
    } else {
      answer += 1;
    }
  }
  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = countSafeReports(inputData);
console.log("Answer is here", answer);
