import { fstat } from "fs";
import { parse } from "yaml";
import fs from "fs";
import { readFile } from "fs/promises";
import { type } from "arktype";
import recursiveReaddirFiles from "recursive-readdir-files";

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

function readCommentFromSlug(path: string) {
  return readComment(`comments/${path}`);
}

function readComment(path: string) {
  const text = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  const parsed = parse(text);
  parsed["date"] = new Date(parsed["date"]);
  const out = CheckComment(parsed);
  if (out instanceof type.errors) {
    console.error(out);
    throw new Error("Invalid comment");
  }
  return out;
}

const getYamlFilesBySlug = (slug: string) => {
  if (!fs.existsSync(`comments/${slug}/`)) {
    return [];
  }
  return fs
    .readdirSync(`comments/${slug}/`)
    .filter((file) => {
      return (
        file.startsWith("entry") &&
        (file.endsWith(".yml") || file.endsWith(".yaml"))
      );
    })
    .map((filename) => `${slug}/${filename}`);
};

export const getComments = (slug: string) =>
  getYamlFilesBySlug(slug)
    .map(readCommentFromSlug)
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

export async function getAllComments() {
  const yamlFiles = await recursiveReaddirFiles("comments", {
    include: /\.ya?ml$/,
  });
  return yamlFiles
    .map((f) => f.path)
    .filter((p) => p.endsWith(".yaml") || p.endsWith(".yml"))
    .map(readComment)
    .toSorted(
      (a, b) => (b.date as Date).getTime() - (a.date as Date).getTime(),
    );
}
