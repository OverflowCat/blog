import type rehypeMathRenderer from "rehype-mathjax/chtml";
import { EXIT, visit } from "unist-util-visit";
import { createRequire } from "node:module";

// Astro closes its config module runner before invoking these plugins. Native
// require keeps renderer loading lazy without using that closed Vite runner.
const require = createRequire(import.meta.url);

import type { RehypePlugin } from "@astrojs/markdown-remark";

async function loadRenderer(mathType: string) {
	if (mathType === "katex")
		return (require("rehype-katex") as typeof import("rehype-katex")).default();
	// rehype-typst does not ship declarations; it follows the same transformer API.
	if (mathType === "typst")
		return (
			require("@myriaddreamin/rehype-typst") as {
				default: () => (
					tree: import("hast").Root,
					file: unknown,
				) => Promise<void>;
			}
		).default();
	if (mathType !== "mathjax") return;
	const { default: rehypeMathRenderer } =
		require("rehype-mathjax/chtml") as typeof import("rehype-mathjax/chtml");
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
				bm: ["\\boldsymbol{#1}", 1],
			},
		},
	} satisfies Parameters<typeof rehypeMathRenderer>[0]);
	return rehypeMathHook;
}

const rehypeMultiMath: RehypePlugin = () => {
	const renderers = new Map<string, ReturnType<typeof loadRenderer>>();
	return async (tree, file) => {
		let hasMath = false;
		visit(tree, "element", (node) => {
			const classes = node.properties.className;
			if (
				Array.isArray(classes) &&
				classes.some(
					(name) =>
						name === "language-math" ||
						name === "math-display" ||
						name === "math-inline",
				)
			) {
				hasMath = true;
				return EXIT;
			}
		});
		// MathJax constructs a document even for trees with no formulae.
		if (!hasMath) return;
		const type = file.data.astro?.frontmatter?.math ?? "mathjax";
		let pending = renderers.get(type);
		if (!pending) {
			pending = loadRenderer(type);
			renderers.set(type, pending);
			pending.catch(() => renderers.delete(type));
		}
		const render = await pending;
		await render?.(tree, file);
	};
};

export default rehypeMultiMath;
