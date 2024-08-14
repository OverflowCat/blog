// 1. Import utilities from `astro:content`
import { schema } from "@/scripts/schema";
import { defineCollection } from "astro:content";
const blogCollection = defineCollection({
	type: "content", // v2.5.0 and later
	schema: () => schema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	blog: blogCollection,
};
