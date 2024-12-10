import path from "path";
import { readInput } from "../utils/data";

function calculate(input: string): number {
  const list = input.split("\n");
  const index = list.findIndex((x) => x === "");
  const rules = list.slice(0, index);
  const queries = list.slice(index + 1);

  const map = new Map<number, number[]>();
  for (const rule of rules) {
    const [a, b] = rule.split("|").map((x) => parseInt(x));
    if (!map.has(a)) {
      map.set(a, []);
    }
    map.get(a)?.push(b);
  }

  let answer = 0;
  for (const query of queries) {
    const pattern = query.split(",").map((x) => parseInt(x));
    const N = pattern.length;
    let isValid = true;
    for (let idx = 0; idx < N; idx++) {
      for (let jdx = idx + 1; jdx < N; jdx++) {
        if (!map.has(pattern[jdx])) continue;
        const neighbors = map.get(pattern[jdx])!;
        if (neighbors.includes(pattern[idx])) {
          // need to swap pattern[idx] and pattern[jdx]
          const temp = pattern[idx];
          pattern[idx] = pattern[jdx];
          pattern[jdx] = temp;
          isValid = false;
        }
      }
    }

    if (!isValid) {
      answer += pattern[Math.floor(N / 2)];
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

console.log("Answer is here", calculate(inputData));
