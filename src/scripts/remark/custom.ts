import { visit } from "unist-util-visit";
import { manjuify } from "../manju.ts";
import { h } from "hastscript";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Image, Paragraph } from "mdast";
const langsSet = new Set(["zh", "de", "es", "en", "fr"]);
export const myRemarkPlugin: RemarkPlugin = () => {
	return (tree, file) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				// biome-ignore lint/suspicious/noAssignInExpressions: else
				const data = node.data || (node.data = {});
				const hast = h(node.name, node.attributes || {});
				let name = hast.tagName;
				let props = hast.properties;
				switch (name) {
					case "j":
						if (props) {
							name = "abbr";
							props = {
								title: props.m || props.e || props.p,
								lang: "zh-juai",
							};
						}
						break;
					case "m": // Möllendorff
						name = "span";
						for (const child of node.children) {
							if (child.type === "text") child.value = manjuify(child.value);
						}
						props = {
							lang: "mnc",
						};
						break;
					case "up":
						name = "span";
						props = {
							className: ["upright"],
						};
						break;
					case "yoko":
						name = "span";
						props = {
							className: ["yoko"],
						};
						break;
					default:
						if (langsSet.has(name)) {
							props = {
								lang: name,
							};
							name = "span";
						}
				}
				data.hName = name;
				data.hProperties = props;
			} else if (node.type === "paragraph") {
				unwrapTonskyImage(node, file.data.astro?.frontmatter?.base ?? "");
			}
		});
	};
};

/**
 * transform single line image url to image node
 *
 * e.g. xxx@2x.webp -> ![](xxx.webp)
 */
function unwrapTonskyImage(node: Paragraph, base: string) {
	if (!(node.children.length === 1 && node.children[0].type === "link")) return;
	const link = node.children[0].url;
	if (!link.startsWith("mailto:")) return;
	(node as unknown as Image).type = "image";
	(node as unknown as Image).title = null;
	(node as unknown as Image).url = `${base}${link.slice(7)}`;
	(node as unknown as Image).alt = "";
	node.data = {};
	// @ts-expect-error
	// biome-ignore lint/performance/noDelete: ast
	delete (node as unknown as Paragraph).children;
}
