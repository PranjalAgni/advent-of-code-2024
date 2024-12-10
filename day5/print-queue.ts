import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function explorePath(graph: Map<number, number[]>, current: number): number[] {
  const queue = [current];
  const visited = new Set<number>();
  const path = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    path.push(current);
    const neighbors = graph.get(current);
    if (neighbors) {
      for (const neighbor of neighbors) {
        queue.push(neighbor);
      }
    }
  }
  return path;
}

function calculate(input: string): number[] {
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

  const answer = [];

  for (const query of queries) {
    const pattern = query.split(",").map((x) => parseInt(x));
    const N = pattern.length;
    let isValid = true;
    for (let idx = 0; idx < N; idx++) {
      const current = pattern[idx];
      // console.log("Searching for", current);
      // if (map.has(current)) console.log("Curr neighbors", map.get(current));
      console.log(`Path ${current} ->`, explorePath(map, current));
      for (let jdx = idx + 1; jdx < N; jdx++) {}
      if (!isValid) break;
    }

    if (isValid) {
      answer.push(pattern[N / 2]);
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

console.log("Answer is here", calculate(inputData));

// 75,47,61,53,29
//
