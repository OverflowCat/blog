import { defineConfig } from "astro/config";

// astro

// heading ids
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "./src/scripts/rehype/anchor.ts";

// icon
import icon from "astro-icon";

// frameworks
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// sitemap
import sitemap from "@astrojs/sitemap";

// math
import remarkMath from "remark-math";
import rehypeMultiMath from "./src/scripts/rehype/math.ts";
import { typst } from "astro-typst";

// code
import remarkSampKbd from "remark-samp-kbd";
import rehypePrettyCode from "rehype-pretty-code";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

import rehypeExternalLinks from "rehype-external-links";
import remarkRuby from "remark-ruby";
import remarkDirect from "remark-directive";
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import type { Node } from "mdast";
function myRemarkPlugin() {
	return (tree: Node) => {
		visit(tree, node => {
			if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
				const data = node.data || (node.data = {});
				const hast = h(node.name, node.attributes || {});
				let name = hast.tagName;
				let props = hast.properties;
				if (name === "j" && props) {
					name = "abbr";
					props = {
						title: props.m || props.e || props.p,
						lang: "zh-juai"
					};
				}
				data.hName = name;
				data.hProperties = props;
			}
		});
	};
}

// @ts-ignore
import remarkFigureCaption from "gridsome-remark-figure-caption"; // "@microflash/remark-figure-caption";

// Atomic CSS
import UnoCSS from "unocss/astro";
import react from "@astrojs/react";
type PrettyCodeNodePositionPoint = {
	line: number;
	column: number;
	offset: number;
};
interface PrettyCodeNode {
	type: string;
	tagName: string;
	properties: {
		className: string[] | undefined;
		"data-line": "";
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	children: any[];
	position: {
		start: PrettyCodeNodePositionPoint;
		end: PrettyCodeNodePositionPoint;
	};
}
const prettyCodeOptions = {
	theme: "material-theme-lighter",
	keepBackground: false,
	onVisitLine(node: PrettyCodeNode) {
		if (node.children.length === 0) {
			node.children = [{
				type: "text",
				value: " "
			}];
		}
	},
	onVisitHighlightedLine(node: PrettyCodeNode) {
		// node.properties.className?.push("highlighted");
		if (node.properties.className === undefined) node.properties.className = [];
		node.properties.className.push("highlighted");
	},
	onVisitHighlightedWord(node: PrettyCodeNode) {
		node.properties.className = ["word"];
	},
	tokensMap: {}
};

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
	site: "https://blog.xinshijiededa.men",
	// redirects: { "/atom.xml": "/feed" },
	build: {
		// format: "preserve",
	},
	vite: {
		css: {
			preprocessorOptions: {}
		},
		ssr: {
			external: ["prismjs", "@myriaddreamin/typst-ts-node-compiler"],
			noExternal: ["xp.css", "98.css", "/@astro-community/"]
		}
	},
	markdown: {
		remarkRehype: {
			footnoteLabel: "---",
			footnoteBackLabel: "返回内容"
		},
		syntaxHighlight: false,
		remarkPlugins: [remarkMath, remarkRuby, remarkFigureCaption, remarkSampKbd, remarkDirect, myRemarkPlugin],
		rehypePlugins: [
			/**
			 * You can customize these heading IDs by adding a rehype plugin that
			 * injects id attributes (e.g. rehype-slug). Your custom IDs, instead
			 * of Astro’s defaults, will be reflected in the HTML output and the
			 * items returned by getHeadings().
			 *
			 * By default, Astro injects idattributes after your rehype plugins
			 * have run. If one of your custom rehype plugins needs to access the
			 * IDs injected by Astro, you can import and use Astro’s
			 * `rehypeHeadingIds` plugin directly. Be sure to add `rehypeHeadingIds`
			 * before any plugins that rely on it:
			 */
			rehypeHeadingIds, rehypeAutolinkHeadings, rehypeMultiMath, [rehypeExternalLinks, {
				rel: [],
				target: "_blank"
			}],
			// @ts-ignore
			[rehypePrettyCode, prettyCodeOptions]]
	},
	experimental: {
		contentCollectionCache: true
	},
	integrations: [icon(), UnoCSS(), svelte(), mdx(), typst(), sitemap(), react()]
});
