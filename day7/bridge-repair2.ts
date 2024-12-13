import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function solveRecursive(total: number, values: number[], current: number, pos: number): boolean {
  const N = values.length;

  if (current > total) {
    return false;
  }

  if (total === current && pos === N) {
    return true;
  }

  if (pos >= N) return false;
  const isAdditionSolvable = solveRecursive(total, values, current + values[pos], pos + 1);
  const isMultiplicationSolvable = solveRecursive(total, values, current * values[pos], pos + 1);
  const isConcatenationSolvable = solveRecursive(total, values, parseInt(`${current}${values[pos]}`), pos + 1);
  return isAdditionSolvable || isMultiplicationSolvable || isConcatenationSolvable;
}

function solveEquation(inputData: string[]): number {
  let answer = 0;
  for (const line of inputData) {
    const [total, values] = line.split(":");
    const valuesList = values
      .trim()
      .split(" ")
      .map((x) => parseInt(x));
    if (solveRecursive(+total, valuesList, valuesList[0], 1)) {
      answer += +total;
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = solveEquation(inputData);
console.log("Answer is here", answer);
