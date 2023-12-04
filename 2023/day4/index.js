import fs from "fs";

const partOneInputArray = fs
  .readFileSync("./partOneInput.txt", "utf-8")
  ?.trim()
  ?.split("\n");
const partTwoInputArray = fs
  .readFileSync("./partTwoInput.txt", "utf-8")
  ?.trim()
  ?.split("\n");

const partOne = () => {
  let totalPoints = 0;
  partOneInputArray?.forEach((lineInput) => {
    let matchingCount = 0;
    let [wins, nums] = lineInput.split(':')[1].split('|');
    wins = wins.match(/\d+/g).map(Number);
    nums = nums.match(/\d+/g).map(Number);
    const winCount = nums.filter((n) => wins.includes(n)).length;
    totalPoints += winCount && 2 ** (winCount - 1);
  });
  console.log(totalPoints);
}

partOne();

function partTwo() {
    const lines = partTwoInputArray;
    const cardsCount = lines.map(() => 1);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let [wins, nums] = line.split(':')[1].split('|');
      wins = wins.match(/\d+/g).map(Number);
      nums = nums.match(/\d+/g).map(Number);
      const nWins = nums.filter((n) => wins.includes(n)).length;
      for (let j = 0; j < nWins; j++) {
        cardsCount[i + 1 + j] += cardsCount[i];
      }
    }
    console.log(cardsCount.reduce((acc, n) => acc + n));
  }

partTwo();
