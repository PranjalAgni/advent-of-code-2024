import fs from "fs/promises";

export const readInput = async (inputPath: string) => {
  const data = await fs.readFile(inputPath, "utf-8");
  return data;
};

export const convertInputToList = (data: string) => {
  if (!data || typeof data !== "string") return [];
  return data.split("\n");
};
