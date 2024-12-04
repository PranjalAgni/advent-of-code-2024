import path from "path";
import { readInput } from "../utils/data";

function multiply(mulStr: string) {
  const numbers = mulStr.split("mul(")[1].replace(")", "");
  const [a, b] = numbers.split(",").map((x) => parseInt(x));
  return a * b;
}
function findAndMultiply(text: string) {
  const regex = /mul\(\d+,\d+\)/g;

  let match = regex.exec(text);
  let answer = 0;
  while (match) {
    const start = match.index;
    const end = regex.lastIndex;
    answer += multiply(text.slice(start, end));
    match = regex.exec(text);
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);
const answer = findAndMultiply(inputData);
console.log("Answer is here", answer);
