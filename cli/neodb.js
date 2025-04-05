// read args from the command line. typical input: movie/1O3OM5a0GELT6BtF7KEtUp
// and send fetch res to
// curl -X 'GET' \
// 'https://neodb.social/api/movie/1O3OM5a0GELT6BtF7KEtUp' \
// -H 'accept: application/json'
// and save the json to ./src/content/neodb/movie/1O3OM5a0GELT6BtF7KEtUp.json

import fs from "node:fs";
import path from "node:path";

async function fetchItem(slug) {
  const url = `https://neodb.social/api/${slug}`;
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please provide a slug for the item");
  process.exit(1);
}
const slug = args[0];
// if has slash, create folder. assume only 1 or 0 slash
const slashIndex = slug.indexOf("/");
const folder = slashIndex === -1 ? "" : slug.slice(0, slashIndex);
const fileName = slashIndex === -1 ? slug : slug.slice(slashIndex + 1);
const folderPath = path.join(".", "src", "content", "neodb", folder);
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}
const filePath = path.join(folderPath, `${fileName}.json`);
console.log(`Fetching ${slug}...`);
const content = await fetchItem(slug);
console.info(content);
fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
console.log(`File ${fileName}.json created successfully!`);
