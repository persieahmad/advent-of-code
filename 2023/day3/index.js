import fs from "fs";

const partOneInputArray = fs
  .readFileSync("./partOneInput.txt", "utf-8")
  ?.trim()
  ?.split("\n");
const partTwoInputArray = fs
  .readFileSync("./partTwoInput.txt", "utf-8")
  ?.trim()
  ?.split("\n");

class Grid {
  data = new Map();
  add(pos, val) {
    this.data.set(`${pos.x},${pos.y}`, { value: val, pos });
  }
  get(pos) {
    this.data.get(`${pos.x},${pos.y}`);
  }
  forEach(cb) {
    this.data.forEach(cb);
  }
}

const boundary = (c, width) => ({
  min: { x: c.x - 1, y: c.y - 1 },
  max: { x: c.x + width, y: c.y + 1 },
});
const within = (c, bounds) =>
  c.x >= bounds.min.x &&
  c.y >= bounds.min.y &&
  c.x <= bounds.max.x &&
  c.y <= bounds.max.y;

const inRange = (n, min, max) => n >= min && n <= max;
const isDigit = (ch) => inRange(ch.charCodeAt(0) - "0".charCodeAt(0), 0, 9);

const parseGrid = (lines) => {
  const nums = new Grid();
  const symbols = new Grid();
  lines.forEach((line, y) => {
    let numStr = "",
      numX = -1;
    for (let x = 0; x < line.length; x++) {
      const ch = line.charAt(x);
      if (ch === ".") {
        // empty
      } else if (isDigit(ch)) {
        numStr += ch;
        numX = numX === -1 ? x : numX;
        if (x < line.length - 1) {
          continue;
        }
      } else {
        symbols.add({ x, y }, ch);
      }

      if (numStr.length > 0) {
        nums.add({ x: numX, y }, parseInt(numStr));
        numStr = "";
        numX = -1;
      }
    }
  });
  return { nums, symbols };
}

const partOne = (lines) => {
  const { nums, symbols } = parseGrid(lines);
  const result = findParts(nums, symbols).reduce((acc, cur) => acc + cur, 0);
  console.log(`Part 1: ${result}`);
}

function findParts(nums, symbols) {
  const parts = [];
  nums.forEach((n) => {
    symbols.forEach((s) => {
      if (within(s.pos, boundary(n.pos, n.value.toString().length))) {
        parts.push(n.value);
      }
    });
  });
  return parts;
}

partOne(partOneInputArray);

const partTwo = (lines) => {
    let result = 0
    const {nums, symbols} = parseGrid(lines)
    const parts = findParts(nums, symbols)
    symbols.forEach(s => {
        const adjacent = []
        nums.forEach(n => {
            if(parts.includes(n.value)){
                if(within(s.pos, boundary(n.pos, n.value.toString().length))){
                    adjacent.push(n.value)
                }
            }
        })
        if(adjacent.length === 2){
            result += adjacent[0] * adjacent[1]
        }
    })
    console.log(`Part 2: ${result}`)
}

partTwo(partTwoInputArray);
