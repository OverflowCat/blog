import { defineConfig } from "astro/config";

// astro

// heading ids
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "./src/scripts/rehype/anchor.ts";

// icon
import icon from "astro-icon";

// frameworks

import mdx from "@astrojs/mdx";

// sitemap
import sitemap from "@astrojs/sitemap";

// math
import remarkMath from "remark-math";
import { typst } from "astro-typst";

// code
// @ts-ignore
import remarkSampKbd from "remark-samp-kbd";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

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

import { rehypePipe } from "./src/scripts/rehype/common.ts";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.xinshijiededa.men",
	// redirects: { "/atom.xml": "/feed" },
	build: {
		// format: "preserve",
	},
	vite: {
		ssr: {
			external: ["prismjs", "@myriaddreamin/typst-ts-node-compiler"],
			noExternal: ["xp.css", "98.css", "rehype-remnote/style/*"]
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
			rehypeHeadingIds,
			// @ts-ignore
			rehypeAutolinkHeadings,
			// @ts-expect-error
		].concat(rehypePipe)
	},
	experimental: {
		contentLayer: true,
		contentCollectionCache: true
	},
	integrations: [icon(), UnoCSS(), react(), mdx(), typst(), sitemap()]
});
