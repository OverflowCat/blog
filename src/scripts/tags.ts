import { getBlogPosts } from "@/scripts/post";
const posts = await getBlogPosts();

export async function getTagsInfo() {
	const tagsInfo = new Map<string, number>();
	posts.map((post) => {
		if (!post.data.tags) return;
		if (typeof post.data.tags === "string") {
			tagsInfo.set(post.data.tags, (tagsInfo.get(post.data.tags) || 0) + 1);
		} else
			for (const tag of post.data.tags as string[]) {
				tagsInfo.set(tag, (tagsInfo.get(tag) || 0) + 1);
			}
	});
	return tagsInfo;
}

export function getCatsInfo() {
	const catsInfo = new Map<string, number>();
	posts.map((post) => {
		if (!post.data.categories) return;
		if (typeof post.data.categories === "string")
			catsInfo.set(
				post.data.categories,
				(catsInfo.get(post.data.categories) || 0) + 1,
			);
		else
			for (const cat of post.data.categories)
				catsInfo.set(cat, (catsInfo.get(cat) || 0) + 1);
	});
	return catsInfo;
}
