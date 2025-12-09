import { readInputFromFile } from "../utils/fs.ts";

function isIdInvalid(id: string): boolean {
  if (id.length % 2 !== 0) return false;
  const firstHalf = id.slice(0, id.length / 2);
  const secondHalf = id.slice(id.length / 2);
  return firstHalf === secondHalf;
}

function getSumOfInvalidIds(ranges: string[]): number {
  let sum = 0;

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    const [start, end] = range.split("-");
    const startNum = Number(start);
    const endNum = Number(end);

    const invalidIds: number[] = [];
    for (let j = startNum; j <= endNum; j++) {
      const currentId = String(j);
      const isValid = isIdInvalid(currentId);
      if (isValid) invalidIds.push(j);
    }

    sum += invalidIds.reduce((idSum, id) => idSum + id, 0);
  }

  return sum;
}

const rangesString = readInputFromFile("src/day2/input");
const listOfRanges = rangesString[0].split(",");
const sumOfInvalidIds = getSumOfInvalidIds(listOfRanges);
console.log("Sum of invalid IDs is", sumOfInvalidIds);
