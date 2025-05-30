import { defineConfig } from "astro/config";

// heading ids
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "./src/scripts/rehype/anchor.ts";

// frameworks

import mdx from "@astrojs/mdx";

import remarkCjk from "remark-cjk-friendly";
import remarkCjkGfm from "remark-cjk-friendly-gfm-strikethrough";

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

// @ts-ignore
import remarkFigureCaption from "gridsome-remark-figure-caption"; // "@microflash/remark-figure-caption";

// Atomic CSS
import unocss from "unocss/astro";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
// import qwik from "@qwikdev/astro";

import { /* myLangs,  */rehypePipe } from "./src/scripts/rehype/common.ts";
import { myRemarkPlugin } from "./src/scripts/remark/custom.ts";
// import expressiveCode from "astro-expressive-code";

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
		experimentalLayout: "constrained",
	},
	experimental: {
		responsiveImages: true,
	},
	vite: {
		server: {
			hmr: {
				timeout: 3000,
			},
		},
		ssr: {
			external: [
				"prismjs",
				"@myriaddreamin/typst-ts-node-compiler",
				"astro-icon",
			],
			noExternal: [
				"7.css",
				"xp.css",
				"98.css",
				"plex-sans-sc-cdn",
				"@shikijs/twoslash/style-rich.css",
				"rehype-remnote/style/*",
			],
		},
	},
	markdown: {
		smartypants: false,
		remarkRehype: {
			footnoteLabel: "---",
			footnoteBackLabel: "返回内容",
		},
		syntaxHighlight: false,
		remarkPlugins: [
			remarkMath,
			remarkRuby,
			remarkCjk,
			remarkCjkGfm,
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
		react({ include: ["**/react/*", "**/*.tsx*", "spoiled"] }),
		svelte(),
		// expressiveCode({ shiki: myLangs }),
		mdx(),
		typst({
            options: {
                remPx: 14,
			},
			target: (id: string): "html" | "svg" => {
                console.debug(`Detecting ${id}`);
				if (id.endsWith(".html.typ") || id.includes("/html/")) return "html";
				if (id.endsWith(".svg.typ") || id.includes("/svg/")) return "svg";
				return "html";
			},
		}),
		sitemap(),
	],
});
