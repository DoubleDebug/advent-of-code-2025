import fs from "fs";

export function readInputFromFile(filePath: string, keepEmptyLines: boolean = false): string[] {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  return keepEmptyLines ? lines : lines.filter((l: string) => l.length > 0);
}
