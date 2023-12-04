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
  let sum = 0;

  const notPossibleGameIds = [];

  partOneInputArray?.forEach((input) => {
    const gameId = input?.split(":")[0]?.split(" ")[1];
    const games = input?.split(":")[1];
    const game = games?.split(";");

    game?.forEach((gameSets) => {
      gameSets?.split(",")?.forEach((set) => {
        const setWithoutFirstSpace = set?.trim();
        let redValid = true;
        let greenValid = true;
        let blueValid = true;

        if (setWithoutFirstSpace?.includes("red")) {
          redValid = parseInt(setWithoutFirstSpace?.split(" ")[0]) <= 12;
        }
        if (setWithoutFirstSpace?.includes("green")) {
          greenValid = parseInt(setWithoutFirstSpace?.split(" ")[0]) <= 13;
        }
        if (setWithoutFirstSpace?.includes("blue")) {
          blueValid = parseInt(setWithoutFirstSpace?.split(" ")[0]) <= 14;
        }

        if (
          (!redValid || !greenValid || !blueValid) &&
          !notPossibleGameIds?.includes(parseInt(gameId))
        ) {
          notPossibleGameIds?.push(parseInt(gameId));
        }
      });
    });
  });

  const gameIds = partOneInputArray?.map((el) =>
    parseInt(el?.split(":")[0]?.split(" ")[1])
  );

  const possibleGameIds = gameIds?.filter(
    (el) => !notPossibleGameIds?.includes(el)
  );

  possibleGameIds?.forEach((el) => (sum += el));

  console.log(sum);
};

partOne();

const partTwo = () => {
  let sum = 0;
  partTwoInputArray?.forEach((input) => {
    // const gameId = input?.split(":")[0]?.split(" ")[1];
    const games = input?.split(":")[1];
    const game = games?.split(";");

    let maxRed = 1;
    let maxGreen = 1;
    let maxBlue = 1;

    game?.forEach((gameSets) => {
      gameSets?.split(",")?.forEach((set) => {
        const setWithoutFirstSpace = set?.trim();

        if (
          setWithoutFirstSpace?.includes("red") &&
          parseInt(setWithoutFirstSpace?.split(" ")[0]) > maxRed
        ) {
          maxRed = parseInt(setWithoutFirstSpace?.split(" ")[0]);
        }
        if (
          setWithoutFirstSpace?.includes("green") &&
          parseInt(setWithoutFirstSpace?.split(" ")[0]) > maxGreen
        ) {
          maxGreen = parseInt(setWithoutFirstSpace?.split(" ")[0]);
        }
        if (
          setWithoutFirstSpace?.includes("blue") &&
          parseInt(setWithoutFirstSpace?.split(" ")[0]) > maxBlue
        ) {
          maxBlue = parseInt(setWithoutFirstSpace?.split(" ")[0]);
        }
      });
    });
    sum += maxRed * maxGreen * maxBlue;
  });
  console.log(sum);
};

partTwo();
