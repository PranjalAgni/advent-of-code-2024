import path from "path";
import { convertInputToList, readInput } from "../utils/data";

// Ordering of directions will help us to know 90 degree rotations
const directions = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

function isValid(row: number, col: number, rows: number, cols: number): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

function moveGuard(
  grid: string[][],
  row: number,
  col: number,
  direction: number,
  visited: Set<string>,
  steps: Set<string>
) {
  const rows = grid.length;
  const cols = grid[0].length;

  while (true) {
    const positionKey = `${row},${col},${direction}`;

    if (visited.has(positionKey)) {
      break;
    }

    visited.add(positionKey);
    steps.add(`${row},${col}`);

    const [rowOffset, colOffset] = directions[direction];
    const nextRow = row + rowOffset;
    const nextCol = col + colOffset;

    if (!isValid(nextRow, nextCol, rows, cols)) break;

    if (grid[nextRow][nextCol] === "#") {
      // means an obstacle
      // Rotate 90 degrees clockwise
      direction = (direction + 1) % 4;
    } else {
      row = nextRow;
      col = nextCol;
    }
  }
}

function countGuardPositions(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited = new Set<string>();
  const steps = new Set<string>();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "^") {
        moveGuard(grid, i, j, 0, visited, steps);
      }
    }
  }

  return steps.size;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

const matrix = convertInputToList(inputData).map((row) => row.split(""));
console.log("Answer is here", countGuardPositions(matrix));
