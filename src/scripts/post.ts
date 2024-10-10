import type { BlogPost } from "@/types";
import { getCollection } from "astro:content";
const posts = (await getCollection<"blog">("blog")).filter(
	(post) => post.data.draft !== true,
);

export async function getBlogPosts() {
	return posts;
}

export function resolvePostId(url: string) {
	return url
		.replace(/^(.*src\/posts)?\//, "")
		.replace(/((\/index)?\.[a-z]+?|\/)$/, "") as BlogPost["id"];
}
