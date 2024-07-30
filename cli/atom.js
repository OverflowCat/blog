import fs from "fs";
try {
  fs.rmSync("./dist/atom.xml", { recursive: true });
} catch (_) {}
try {
  fs.rmSync("./dist/atom.xml");
} catch (_) {}

try {
  fs.mkdirSync("./dist/atom.xml");
  fs.renameSync("./dist/feed.html", "./dist/atom.xml/index.xml");
} catch (e) {
  console.error("Moving atom.xml failed: ", e);
}
