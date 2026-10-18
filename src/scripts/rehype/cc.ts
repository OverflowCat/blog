import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import { prepareHant } from "../cc.ts";

/** Cache static conversions with Astro's compiled Markdown/MDX metadata. */
const rehypeChinese: RehypePlugin = () => (tree, file) => {
	// Comments and other collections do not have a /hant/ variant.
	if (!/(?:^|[/\\])posts[/\\]/.test(file.path)) return;
	const replacements = new Map<string, string>();
	visit(tree, (node) => {
		if ("value" in node && typeof node.value === "string") {
			prepareHant(node.value, replacements);
		} else if (node.type === "element") {
			for (const value of Object.values(node.properties)) {
				if (typeof value === "string") prepareHant(value, replacements);
			}
		}
	});
	const astro = file.data.astro;
	if (astro?.frontmatter)
		astro.frontmatter.hantReplacements = [...replacements];
};

export default rehypeChinese;
