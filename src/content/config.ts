// 1. Import utilities from `astro:content`
import { blogSchema } from "@/scripts/schema/content";
import { neoSchema } from "@/scripts/schema/neodb";
import { defineCollection, z } from "astro:content";
const blogCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: () => blogSchema,
});
const neodbCollection = defineCollection({
	type: "data",
	schema: () => neoSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	blog: blogCollection,
};
