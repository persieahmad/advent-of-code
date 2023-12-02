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
  const list = partOneInputArray.map((input) => {
    const firstDigit = input
      ?.split("")
      ?.find((el) => !Number.isNaN(Number(el)));
    const lastDigit = input
      ?.split("")
      ?.reverse()
      ?.find((el) => !Number.isNaN(Number(el)));
    return Number(firstDigit + lastDigit);
  });
  const sum = list?.reduce((acc, cur) => acc + cur);
  console.log(sum);
};

partOne();

const firstNumWordRegEx = new RegExp(
  [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]?.join("|")
);
const lastNumWordRegEx = new RegExp(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    ?.join("|")
    ?.split("")
    ?.reverse()
    ?.join("")
);

const wordMapping = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const partTwo = () => {
  const list = partTwoInputArray.map((input) => {
    const firstDigitIndex = input
      ?.split("")
      ?.findIndex((el) => !Number.isNaN(Number(el)));

    const firstNumWordMatch = input?.match(firstNumWordRegEx);
    const firstNumWordIndex = firstNumWordMatch?.index;

    const firstNum =
      firstDigitIndex != -1
        ? firstNumWordMatch
          ? firstDigitIndex < firstNumWordIndex
            ? input[firstDigitIndex]
            : wordMapping[firstNumWordMatch[0]]
          : input[firstDigitIndex]
        : wordMapping[firstNumWordMatch[0]];

    const lastDigitIndex = input
      ?.split("")
      ?.findLastIndex((el) => !Number.isNaN(Number(el)));
    const lastNumWordMatch = input
      ?.split("")
      ?.reverse()
      ?.join("")
      ?.match(lastNumWordRegEx);
    const lastNumWordIndex = lastNumWordMatch
      ? input?.length - 1 - lastNumWordMatch?.index
      : null;

    const lastNum =
      lastDigitIndex != -1
        ? lastNumWordMatch
          ? lastDigitIndex > lastNumWordIndex
            ? input[lastDigitIndex]
            : wordMapping[lastNumWordMatch[0]?.split("")?.reverse()?.join("")]
          : input[lastDigitIndex]
        : wordMapping[lastNumWordMatch[0]?.split("")?.reverse()?.join("")];

    return Number(firstNum + lastNum);
  });
  const sum = list
    ?.filter((el) => !Number.isNaN(el))
    ?.reduce((acc, cur) => acc + cur);
  console.log(sum);
};

partTwo();
