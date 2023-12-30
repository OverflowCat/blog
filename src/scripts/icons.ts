import type { CollectionEntry } from "astro:content";

export function getIconName(post: CollectionEntry<"blog">) {
  if (post.data.icon) return post.data.icon;
  const categories = post.data.categories?.toString();
  if (!categories) {
    return;
  }
  if (categories.includes("满语")) {
    return "manju";
  }
  if (categories.includes("译文")) {
    return "ic:round-translate";
  }
  if (categories.includes("Selected")) {
    return "ph:star";
  }
}
