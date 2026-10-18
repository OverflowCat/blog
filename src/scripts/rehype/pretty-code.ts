import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import lazyTwoslash from "./lazy-twoslash.ts";
import { getSingletonHighlighter } from "shiki";
import { shikiGitDiff } from "shiki-git-diff";
import CangjieLanguage from "./cangjie.tmLanguage.json" with { type: "json" };
export const myLangs = {
	langs: [CangjieLanguage],
	langAlias: {
		cj: "cangjie",
	},
};

export default function prettyCode() {
	const prettyCodeOptions: Options = {
		theme: "snazzy-light",
		keepBackground: false,
		transformers: [
			lazyTwoslash(),
			// shiki-git-diff still declares Shiki 3 types; its hooks work with Shiki 4.
			shikiGitDiff({
				// @ts-expect-error: hidden type
				condition: (ctx) => /\bdiff\b/.test(ctx?.options?.meta?.__raw),
			}) as NonNullable<Options["transformers"]>[number],
		],
		getHighlighter: (options) =>
			getSingletonHighlighter({
				...options,
				...myLangs,
			}),
		onVisitLine(node) {
			if (node.children.length === 0) {
				node.children = [
					{
						type: "text",
						value: " ",
					},
				];
			}
		},
		onVisitHighlightedLine(node) {
			// node.properties.className?.push("highlighted");
			if (node.properties.className === undefined)
				node.properties.className = [];
			node.properties.className.push("highlighted");
		},
		onVisitHighlightedChars(node) {
			node.properties.className = ["word"];
		},
		tokensMap: {},
	};

	return rehypePrettyCode(prettyCodeOptions);
}
