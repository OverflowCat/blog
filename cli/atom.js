import fs from "fs";

try {
  fs.renameSync("./dist/feed/index.html", "./dist/atom.xml");
} catch (e) {
  console.error("Moving atom.xml failed: ", e);
}
