import { getBlogPosts } from "@/scripts/post";

const posts = await getBlogPosts();

const tagsInfo = new Map<string, number>();
export function getTagsInfo() {
	if (tagsInfo.size > 0) return tagsInfo;
	posts.forEach((post) => {
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

const catsInfo = new Map<string, number>();
export function getCatsInfo() {
	if (catsInfo.size > 0) return catsInfo;
	posts.forEach((post) => {
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

export {
	CAT_MAP,
	getCatLabel,
	getCatSlug,
	getTagLabel,
	getTagSlug,
} from "@/scripts/taxonomy-data";
