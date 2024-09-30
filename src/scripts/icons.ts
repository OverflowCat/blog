import type { BlogPost } from "@/types"

export function getIconName(post: BlogPost) {
  if (post.data.icon) return post.data.icon;
  const categories = post.data.categories?.toString();
  // TODO: Fix this
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

export const ICON_PACKS = 	[
	"clarity",
	"codicon",
	"entypo-social",
	"fluent",
	"gravity-ui",
	"ic",
	"icon-park",
  "logos",
	"material-symbols",
	"mdi",
	"ph",
	"pixelarticons",
	"ri",
	"simple-icons",
	"tabler"
] as const;

export const ICON_PACKS_SET = new Set(ICON_PACKS) as Set<string>;

export type IconSet = typeof ICON_PACKS[number];
export type IconName = `${IconSet}:${string}`;
export type AtomIconName = `i-${IconSet}:${string}`;
