import { fstat } from "fs";
import { parse } from "yaml";
import fs from "fs";
import { type } from "arktype";

export const CheckComment = type({
  id: "string",
  name: "string",
  email: "string",
  "website?": "string",
  "twitter?": "string",
  "activitypub?": "string",
  "format?": "'markdown'|'html'",
  message: "string",
  date: "any",
  "reply?": "string",
});

export type CheckedComment = typeof CheckComment.infer;

function readComment(path: string) {
  const text = fs.readFileSync(`comments/${path}`, {
    encoding: "utf-8",
  });
  const parsed = parse(text);
  parsed["date"] = new Date(parsed["date"]);
  const { data, problems } = CheckComment(parsed);
  if (problems) {
    console.error(problems);
    throw new Error("Invalid comment");
  }
  return data;
}

const getYamlFiles = (slug: string) => {
  if (!fs.existsSync(`comments/${slug}/`)) {
    return [];
  }
  return fs
    .readdirSync(`comments/${slug}/`)
    .filter((file) => {
      return file.startsWith("entry") && file.endsWith(".yml");
    })
    .map((filename) => `${slug}/${filename}`);
};

export const getComments = (slug: string) =>
  getYamlFiles(slug)
    .map(readComment)
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
