import rehypeMultiMath from "./math.ts";
import rehypeChinese from "./cc.ts";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeTwemoji, type RehypeTwemojiOptions } from "rehype-twemoji";
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { EXIT, visit } from "unist-util-visit";
import prettyCode from "./pretty-code.ts";

const rehypeCode: RehypePlugin = () => {
	let renderer: ReturnType<typeof prettyCode> | undefined;
	return async (tree, file) => {
		let hasCode = false;
		visit(tree, "element", (node) => {
			if (node.tagName === "code") {
				hasCode = true;
				return EXIT;
			}
		});
		if (!hasCode) return;
		renderer ??= prettyCode();
		if (renderer) await renderer(tree, file, () => {});
	};
};

export const rehypePipe = [
	rehypeChinese,
	rehypeMultiMath,
	[
		rehypeExternalLinks,
		{
			rel: [],
			target: "_blank",
		},
	],
	rehypeCode,
	[rehypeTwemoji, {} as RehypeTwemojiOptions],
];
