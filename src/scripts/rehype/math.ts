// math
import rehypeMathRenderer from "rehype-mathjax/chtml";
// import rehypeKatex from 'rehype-katex'
// typst
// @ts-ignore
import rehypeTypst from "@myriaddreamin/rehype-typst";

import type * as hast from "hast";
import type { MarkdownVFile, RehypePlugin } from "@astrojs/markdown-remark";
import type { Frontmatter } from "@/types";

const rehypeMultiMath: RehypePlugin = () => {
	// init mathjax
	const rehypeMathHook = rehypeMathRenderer({
		chtml: {
			fontURL:
				"https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
		},
		tex: {
			// @ts-expect-error
			macros: {
				bold: ["{\\bf #1}", 1],
				inv: ["-1"],
				dd: ["\\mathrm{d}"],
				j: ["\\mathrm{j}"],
				i: ["\\mathrm{i}"],
				cloze: ["\\color{blue}"],
			},
		},
	} satisfies Parameters<typeof rehypeMathRenderer>[0]);
	// init katex
	// const rehypeKatexHook = rehypeKatex();
	// init typst
	const rehypeTypstHook = rehypeTypst();

	return (tree: hast.Root, vfile: MarkdownVFile) => {
		const frontmatter = (vfile.data.astro as { frontmatter: Frontmatter })?.frontmatter;
		const mathType = frontmatter?.math ?? "mathjax";
		switch (mathType) {
			case "mathjax":
				// @ts-ignore
				return rehypeMathHook(tree, vfile);
			case "typst":
				// @ts-ignore
				return rehypeTypstHook(tree, vfile);
			// case "katex":
			// 	// @ts-ignore
			// 	return rehypeKatexHook(tree, vfile);
			default:
				// handle default case here
				break;
		}
	};
};

export default rehypeMultiMath;
