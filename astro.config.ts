import { defineConfig } from "astro/config";
// astro
// import node from '@astrojs/node';

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

import { manjuify } from "./src/scripts/manju.ts";
import remarkRuby from "remark-ruby";
import remarkDirect from "remark-directive";
import { h } from "hastscript";
import { visit } from "unist-util-visit";
import type { Node } from "mdast";
function myRemarkPlugin() {
	return (tree: Node) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
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
						// console.log(node);
						/*
						{
						type: 'textDirective',
						name: 'm',
						attributes: {},
						children: [ { type: 'text', value: 'ilha -i', position: [Object] } ],
						position: {
							start: { line: 18, column: 87, offset: 1237 },
							end: { line: 18, column: 98, offset: 1248 }
						},
						data: {}
						}
						*/
						// @ts-ignore
						node.children?.forEach((child) => {
							if (child.type === "text") child.value = manjuify(child.value);
						});
						// console.log(node);
						props = {
							lang: "mnc",
						};
						break;
					case "de":
						name = "span";
						props = {
							lang: "de",
						};
						break;
					case "en":
						name = "span";
						props = {
							lang: "en",
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
import unocss from "unocss/astro";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
// import qwik from "@qwikdev/astro";

import { rehypePipe } from "./src/scripts/rehype/common.ts";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.xinshijiededa.men",
	// redirects: { "/atom.xml": "/feed" },
	build: {
		// format: "preserve",
	},
	// output: "server",
	// adapter: node({
  //   mode: 'standalone',
  // }),
	image: {
		domains: [
			"github.com",
			"githubusercontent.com",
			"wikimedia.org",
			"xkcd.in",
		],
	},
	vite: {
		server: {
			hmr: {
				timeout: 3000,
			},
		},
		ssr: {
			external: ["prismjs", "@myriaddreamin/typst-ts-node-compiler", "astro-icon"],
			noExternal: [
				"xp.css",
				"98.css",
				"plex-sans-sc-cdn",
				"@shikijs/twoslash/style-rich.css",
				"rehype-remnote/style/*",
			],
		},
	},
	markdown: {
		remarkRehype: {
			footnoteLabel: "---",
			footnoteBackLabel: "返回内容",
		},
		syntaxHighlight: false,
		remarkPlugins: [
			remarkMath,
			remarkRuby,
			remarkFigureCaption,
			remarkSampKbd,
			remarkDirect,
			myRemarkPlugin,
		],
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
		].concat(rehypePipe),
	},
	integrations: [
		unocss(),
		// qwik({ include: ["**/qwik/*", "**/*.qwik.*sx"] }),
		react(
			// { include: ["**/react/*", "**/*.tsx*", "spoiled"] }
		),
		svelte(),
		mdx(),
		typst(),
		sitemap(),
		icon(),
	],
});
