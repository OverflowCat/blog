// 1. Import utilities from `astro:content`
import { commentsSchema } from "@/scripts/schema/comments";
import { postSchemaGen } from "@/scripts/schema/content";
import { neoSchema } from "@/scripts/schema/neodb";
import { remnoteJsonSchema } from "@/scripts/schema/remnote";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import fs from "node:fs";
import { dialData } from "./scripts/schema/dialmap";

// 2. Define a collection using `defineCollection`
const postDir = "./src/posts/";
if (!fs.existsSync(postDir))
  console.error(`Directory ${postDir} does not exist`);
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.(md|mdx|typ)", base: postDir }),
  schema: postSchemaGen,
});

const dialCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/dial/" }),
  schema: () => dialData,
});

const neodbCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/neodb/" }),
  schema: () => neoSchema,
});

const commentsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/comments/" }),
  schema: () => commentsSchema,
});

const remnoteCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/rems/" }),
  schema: () => remnoteJsonSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  comments: commentsCollection,
  rems: remnoteCollection,
  neodb: neodbCollection,
  dial: dialCollection,
};
