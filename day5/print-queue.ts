import path from "path";
import { readInput } from "../utils/data";

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
    const pattern = new Map(
      query
        .split(",")
        .filter((x) => x.length > 0)
        .map((k, i) => [parseInt(k), i])
    );

    let isValid = true;
    for (const [from, to] of map.entries()) {
      for (const neighbor of to) {
        if (pattern.has(+from) && pattern.has(neighbor) && pattern.get(+from)! > pattern.get(neighbor)!) {
          isValid = false;
          break;
        }
      }

      if (!isValid) break;
    }

    if (isValid) {
      const entries = [...pattern];
      const middleIndex = Math.floor(entries.length / 2);
      const middleElement = entries[middleIndex][0];

      answer += middleElement;
    }
  }

  return answer;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

console.log("Answer is here", calculate(inputData));
