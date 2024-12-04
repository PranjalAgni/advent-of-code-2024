import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function findDistance(inputData: string[]) {
  const list1 = [];
  const freqMap = new Map<number, number>();
  for (const input of inputData) {
    const [a, b] = input.split("   ").map((x) => parseInt(x));
    list1.push(a);
    freqMap.set(b, (freqMap.get(b) || 0) + 1);
  }

  let distance = 0;

  for (const elt of list1) {
    distance += elt * (freqMap.get(elt) || 0);
  }

  return distance;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = findDistance(inputData);
console.log("Answer is here", answer);
