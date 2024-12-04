import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function findDistance(inputData: string[]) {
  const list1 = [];
  const list2 = [];
  for (const input of inputData) {
    const [a, b] = input.split("   ").map((x) => parseInt(x));
    list1.push(a);
    list2.push(b);
  }

  list1.sort();
  list2.sort();
  let pos = 0;
  let distance = 0;
  while (pos < list1.length) {
    distance += Math.abs(list1[pos] - list2[pos]);
    pos += 1;
  }

  return distance;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = convertInputToList(await readInput(INPUT_PATH));
const answer = findDistance(inputData);
console.log("Answer is here", answer);
