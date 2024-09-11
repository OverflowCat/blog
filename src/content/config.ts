// 1. Import utilities from `astro:content`
import { commentsSchema } from "@/scripts/schema/comments";
import { blogSchema } from "@/scripts/schema/content";
import { neoSchema } from "@/scripts/schema/neodb";
import { getRemnotes, remnoteSchema } from "@/scripts/schema/remnote";
import { defineCollection } from "astro:content";

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

const remnoteCollection = defineCollection({
  type: "content_layer",
  schema: () => remnoteSchema,
  loader: async () => {
    const notes = await getRemnotes("./src/content/rems");
    return notes;
  },
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  comments: commentsCollection,
  remnote: remnoteCollection,
  neodb: neodbCollection,
};
