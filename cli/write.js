import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please provide a title for the blog post");
  process.exit(1);
}
const title = args[0];

const content = `---
title: ${title}
date: ${new Date().toISOString()}
photo:
noscript: false
licence: false
layout: "@/layouts/Default.astro"
tags: []
categories: []
draft: true
---

`;

const filePath = path.join(".", "src", "content", "blog", `${title}.mdx`);

fs.writeFile(filePath, content, (err) => {
  if (err) throw err;
  console.log(`File ${title}.mdx created successfully!`);
});
