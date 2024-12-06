import path from "path";
import { convertInputToList, readInput } from "../utils/data";

function countOccurrences(grid: string[][], target: string): number {
  if (!grid.length || !grid[0].length || !target.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const targetLength = target.length;
  let count = 0;

  // Directions for movement: [rowDelta, colDelta]
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Top-left
    [-1, 1], // Top-right
    [1, -1], // Bottom-left
    [1, 1], // Bottom-right
  ];

  // Helper function to check for the target in a specific direction
  const searchInDirection = (row: number, col: number, rowDelta: number, colDelta: number): boolean => {
    for (let i = 0; i < targetLength; i++) {
      const newRow = row + i * rowDelta;
      const newCol = col + i * colDelta;

      // Check bounds and character match
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || grid[newRow][newCol] !== target[i]) {
        return false;
      }
    }
    return true;
  };

  // Iterate through each cell in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Start search only if the first character matches
      if (grid[row][col] === target[0]) {
        for (const [rowDelta, colDelta] of directions) {
          if (searchInDirection(row, col, rowDelta, colDelta)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

const INPUT_PATH = path.join(__dirname, "input.txt");
const inputData = await readInput(INPUT_PATH);

const matrix = convertInputToList(inputData).map((row) => row.split(""));
const target = "XMAS";

console.log("Answer is here", countOccurrences(matrix, target));
