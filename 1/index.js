import { readFile } from 'node:fs';
import { promisify } from 'node:util';
import { EOL } from 'node:os';

const data = await promisify(readFile)('./input.txt', 'utf-8');

let currentElfCalorieCount = 0;
let currentElfIndex = 1;

const inventoryCounts = [];

function insertInventoryCount(index, count) {
  const insertBefore = inventoryCounts.findIndex((item) => item.count > count);
  inventoryCounts.splice(
    insertBefore >= 0 ? insertBefore : inventoryCounts.length,
    0,
    { index, count },
  );
}

for (const line of data.split(EOL)) {
  // it's a new elf, stash data and reset counters
  if (!line) {
    insertInventoryCount(currentElfIndex, currentElfCalorieCount);
    currentElfCalorieCount = 0;
    currentElfIndex = currentElfIndex + 1;
  } else {
    // same elf, add current line value to running total
    currentElfCalorieCount = currentElfCalorieCount + parseInt(line);
  }
}

const highestCalories = inventoryCounts.slice(inventoryCounts.length - 3);

console.log(
  'highestCalories',
  highestCalories.reduce((agg, item) => agg + item.count, 0),
);
