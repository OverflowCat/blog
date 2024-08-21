import { getCollection } from "astro:content";
import { timeIt } from "./debug";
// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
let posts;

export async function getBlogPosts() {
	posts ||= timeIt(async () => (await getCollection("blog")).filter(
		(post) => post.data.draft !== true,
	), "getBlogPosts:");
	return posts;
}
