import { mod } from "../utils/math.ts";
import { readInputFromFile } from "../utils/fs.ts";

const DIAL_SIZE = 100 as const;

function rotate(currentValue: number, rotation: string) {
  const direction = rotation.slice(0, 1);
  const distance = Number(rotation.slice(1));
  const sign = direction === "L" ? -1 : 1;

  // calculate new value
  const newValue = mod(currentValue + distance * sign, DIAL_SIZE);

  // calculate num of zeros
  let tmpValue = currentValue + distance * sign;
  let numOfZeros = 0;
  if (tmpValue <= 0) {
    tmpValue *= -1;
    if (currentValue !== 0) numOfZeros = 1;
  }
  numOfZeros += Math.floor(tmpValue / DIAL_SIZE);

  return { newValue, numOfZeros };
}

function getPassword(initialValue: number, rotations: string[]) {
  let zeroCount = 0;
  let value = initialValue;
  for (let i = 0; i < rotations.length; i++) {
    const rotation = rotations[i];
    const { newValue, numOfZeros } = rotate(value, rotation);
    value = newValue;
    zeroCount += numOfZeros;
  }
  return zeroCount;
}

const initialValue = 50;
const rotations = readInputFromFile("src/day1/input");
const password = getPassword(initialValue, rotations);
console.log("Resulting password is", password);
