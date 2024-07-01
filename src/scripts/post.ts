import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection<"blog">("blog");
  return posts.filter((post) => post.data.draft !== true);
}
