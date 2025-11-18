import { visit } from "unist-util-visit";
import { manjuify } from "../manju.ts";
import { h } from "hastscript";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Image, Paragraph } from "mdast";
const langsSet = new Set(["zh", "de", "es", "en", "fr", "vi", "bo"]);
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
					// biome-ignore lint/suspicious/noFallthroughSwitchClause: fallthrough is intended
					case "m": // Möllendorff
						for (const child of node.children) {
							if (child.type === "text") child.value = manjuify(child.value);
						}
					case "mnc": // Manchu
						name = "span";
						props = {
							lang: "mnc",
						};
						break;
					case "mv": // Manchu and vertical
						name = "span";
						props = {
							className: "write-vertical-left",
							lang: "mnc",
						};
						break;
					case "bn":
						name = "span";
						props = {
							className: ["bn"],
						};
						break;
					case "up":
						name = "span";
						props = {
							className: ["upright"],
						};
						break;
					case "Q":
					case "q":
						console.log("Wikidata directive found:", node);
						if (
							node.children.length === 1 &&
							node.children[0].type === "text" &&
							/^Q\d+$/i.test(node.children[0].value.trim())
						) {
							name = "sup";
							const wikidataId = node.children[0].value.trim();
							data.hChildren = [
								h(
									"a",
									{
										className: "wikidata mono",
										href: `https://www.wikidata.org/wiki/${wikidataId}`,
									},
									wikidataId,
								),
							];
						}
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
						} else if (name.endsWith("wiki")) {
							const wikilang = name.slice(0, -4);
							if (node.children.length === 1 &&
								node.children[0].type === "text") {
								const term = node.children[0].value.trim();
								name = "a";
								props = {
									className: `wiki`,
									lang: wikilang,
									href: `https://${wikilang}.wikipedia.org/wiki/${encodeURIComponent(term.replace(/ /g, "_"))}`,
								};
							}
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
	if (!link.endsWith(".webp")) return;
	(node as unknown as Image).type = "image";
	(node as unknown as Image).title = null;
	(node as unknown as Image).url = `${base}${link.slice(7)}`;
	(node as unknown as Image).alt = "";
	node.data = {};
	// @ts-expect-error
	// biome-ignore lint/performance/noDelete: ast
	delete (node as unknown as Paragraph).children;
}
