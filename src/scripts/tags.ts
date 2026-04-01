import { getBlogPosts } from "@/scripts/post";
const posts = await getBlogPosts();

const tagsInfo = new Map<string, number>();
export function getTagsInfo() {
	if (tagsInfo.size > 0) return tagsInfo;
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

const catsInfo = new Map<string, number>();
export function getCatsInfo() {
	if (catsInfo.size > 0) return catsInfo;
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

export const CAT_MAP = {
	"页面仔的自我修养": "frontend",
	"笔记": "note",
	"Typst": "typst",
	"译文": "translation",
	"Tonsky": "tonsky",
	"光学": "optics",
	"Changelog": "changelog",
	"Writeup": "writeup",
	"题解": "solution",
	"满语": "manchu",
	"Selected": "selected",
	"Python": "python",
	'读书笔记': "book",
	'年终总结': "wrapped",
	'动态列表': "list",
	'咬文嚼字': "word",
	'题隙碎笔': "gaokao",
	"日常": "daily",
} as Record<string, string>;

export function getCatSlug(cat: string) {
	return CAT_MAP[cat] ?? cat;
}
