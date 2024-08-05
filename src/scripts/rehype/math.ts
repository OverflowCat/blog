// math
import remarkMath from "remark-math";
import rehypeMathRenderer from "rehype-mathjax/chtml";
// typst
import rehypeTypst from "@myriaddreamin/rehype-typst";

import type * as hast from "hast";
import type * as mdast from "mdast";

const rehypeMultiMath: RehypePlugin = () => {
	// init mathjax
	const rehypeMathHook = rehypeMathRenderer({
		chtml: {
			fontURL:
				"https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
		},
	} satisfies Parameters<typeof rehypeMathRenderer>[0]);
	// init typst
	const rehypeTypstHook = rehypeTypst();

	return (tree: hast.Root, vfile: MarkdownVFile) => {
		const frontmatter = (vfile.data.astro as { frontmatter: Frontmatter })
			.frontmatter;
		switch (frontmatter.math) {
			case "mathjax":
				// @ts-ignore
				return rehypeMathHook(tree, vfile);
			case "typst":
				// @ts-ignore
				return rehypeTypstHook(tree, vfile);
			default:
				// handle default case here
				break;
		}
	};
};

export default rehypeMultiMath;
