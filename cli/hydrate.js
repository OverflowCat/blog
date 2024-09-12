import fs from "fs";
import { hydrate } from "rehype-remnote";
// read filename from cli
const filename = process.argv[2];

// read file
const file = fs.readFileSync(filename, "utf8");
console.log(file);

const json = JSON.parse(file);

// hydrate
const result = hydrate(json);

// write to file
fs.writeFileSync(filename + ".hyd.json", JSON.stringify(result, null, 0));
