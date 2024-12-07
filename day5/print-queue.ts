import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function calculate(input: string): number {
  return 42;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

console.log("Answer is here", calculate(inputData));
