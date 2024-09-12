// 1. Import utilities from `astro:content`
import { commentsSchema } from "@/scripts/schema/comments";
import { blogSchema } from "@/scripts/schema/content";
import { neoSchema } from "@/scripts/schema/neodb";
import { getRemnotes, remnoteJsonSchema } from "@/scripts/schema/remnote";
import { defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

// 2. Define a collection using `defineCollection`
const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: () => blogSchema,
});

const neodbCollection = defineCollection({
  type: "data",
  schema: () => neoSchema,
});

const commentsCollection = defineCollection({
  type: "content",
  schema: () => commentsSchema,
});

/*
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { glob } from "fs";

const remnoteCollection = defineCollection({
  type: "content_layer",
  schema: () => remnoteSchema,
  loader: async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const remsDir = join(__dirname, 'rems');
    try {
      const files = await readdir(remsDir);
      console.log('Files in the directory:', files);
    } catch (err) {
      console.error('Error reading directory:', err);
    }
    const notes = await getRemnotes(remsDir);
    console.info('RemNotes loaded:', notes);
    return notes;
  },
  // loader: glob({ pattern: "**\/*.js", base: "./src/content/rems/" }),
});
*/

const remnoteCollection = defineCollection({
  type: "data",
  schema: () => remnoteJsonSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  comments: commentsCollection,
  rems: remnoteCollection,
  neodb: neodbCollection,
};
