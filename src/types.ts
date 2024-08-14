import type { CollectionEntry } from "astro:content";
// type CollectionEntry = import('astro:content').CollectionEntry;
export type BlogPost = CollectionEntry<"blog">;
export type Frontmatter = BlogPost["data"];
