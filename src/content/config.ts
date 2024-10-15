// 1. Import utilities from `astro:content`
import { commentsSchema } from "@/scripts/schema/comments";
import { postSchemaGen } from "@/scripts/schema/content";
import { neoSchema } from "@/scripts/schema/neodb";
import { remnoteJsonSchema } from "@/scripts/schema/remnote";
import { defineCollection } from "astro:content";
import { glob } from 'astro/loaders';

// 2. Define a collection using `defineCollection`
const blogCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.(md|mdx)', base: "./src/posts/" }),
  schema: postSchemaGen,
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
  loader: glob({ pattern: '**\/[^_]*.json', base: "./src/content/rems/" }),
  schema: () => remnoteJsonSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  comments: commentsCollection,
  rems: remnoteCollection,
  neodb: neodbCollection,
};
