import { getCollection } from "astro:content";

export const posts = await getCollection(
  "blog",
  (entry) => !entry.slug.includes("_") && entry.data.draft !== true
);
