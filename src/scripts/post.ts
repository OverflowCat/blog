import { getCollection } from "astro:content";
const posts = (await getCollection<"blog">("blog")).filter(
	(post) => post.data.draft !== true,
);

export async function getBlogPosts() {
	return posts;
}
