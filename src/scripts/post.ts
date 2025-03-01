import type { BlogPost } from "@/types";
import { getCollection } from "astro:content";

export async function getBlogPosts(includeDrafts = false) {
	const posts = (await getCollection<"blog">("blog")).sort((a, b) => {
		return b.data.date.getTime() - a.data.date.getTime();
	});

	if (!includeDrafts) {
		return posts.filter(
			(post) => post.data.draft !== true,
		);
	}
	return posts;
}

export function resolvePostId(url: string) {
	return url
		.replace(/^(.*src\/posts)?\//, "")
		.replace(/((\/index)?\.[a-z]+?|\/)$/, "") as BlogPost["id"];
}
