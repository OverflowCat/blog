// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    tags: z.optional(z.union([z.string(), z.array(z.string())])),
    photo: z.string().optional(),
    date: z.date(),
    draft: z.boolean().optional(),
    categories: z.optional(z.union([z.string(), z.array(z.string())])),
    description: z.string().optional(),
    icon: z.string().optional(),
    mathjax: z.boolean().optional(),
    hide_title: z.boolean().optional(),
    noscript: z.boolean(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
};
