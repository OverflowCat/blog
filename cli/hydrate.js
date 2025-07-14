import fs from "node:fs";
import { hydrate } from "rehype-remnote";
// read filename from cli
let filename = process.argv[2];
if (!filename.includes("/")) {
    filename = "./src/content/rems/" + filename;
}

// read file
const file = fs.readFileSync(filename, "utf8");
console.log(file);

const json = JSON.parse(file);

// hydrate
const result = hydrate(json);

// write to file
fs.writeFileSync(filename + ".hyd.json", JSON.stringify(result, null, 0));
