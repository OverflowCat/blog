import { defineConfig } from "astro/config";

// astro

// heading ids
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings, { type Options } from "rehype-autolink-headings";

// icon
import icon from "astro-icon";

// frameworks
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// sitemap
import sitemap from "@astrojs/sitemap";

// math
import remarkMath from "remark-math";
import rehypeMathRenderer from "rehype-mathjax/chtml";

// typst
import { typst } from "astro-typst";

// code
import rehypePrettyCode from "rehype-pretty-code";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

import rehypeExternalLinks from "rehype-external-links";
import remarkRuby from "remark-ruby";

// @ts-ignore
import remarkFigureCaption from "gridsome-remark-figure-caption"; // "@microflash/remark-figure-caption";

// Atomic CSS
import UnoCSS from "unocss/astro";

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
			node.children = [
				{
					type: "text",
					value: " ",
				},
			];
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
	tokensMap: {},
};
/*
// rss
const moveAtom = () => {
  return {
    name: "move-atom-feed",
    apply: "build",
    buildEnd() {
      // move ./dist/feed/index.html to ./dist/atom.xml
      try {
        fs.renameSync("./dist/feed/index.html", "./dist/atom.xml");
      } catch (e) {
        console.error("Moving atom.xml failed: ", e);
      }
    },
  } as const;
};
 */

const rehypeMath = [
	rehypeMathRenderer,
	{
		chtml: {
			fontURL:
				"https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
		},
	},
];

// https://astro.build/config
export default defineConfig({
	site: "https://blog.xinshijiededa.men",
	// redirects: { "/atom.xml": "/feed" },
	build: {
		// format: "preserve",
	},
	vite: {
		css: {
			preprocessorOptions: {},
		},
		ssr: {
			external: ["prismjs", "@myriaddreamin/typst-ts-node-compiler"],
			noExternal: ["modern-css-reset", "xp.css", "98.css"],
		},
	},
	markdown: {
		remarkRehype: {
			footnoteLabel: "---",
			footnoteBackLabel: "返回内容",
		},
		syntaxHighlight: false,
		remarkPlugins: [remarkMath, remarkRuby, remarkFigureCaption],
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
			[
				rehypeAutolinkHeadings,
				{
          content: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["anchor"] },
              children: [{ type: "text", value: "#" }],
            },
          ],
					behavior: "append",
				} satisfies Options,
			],
			// TODO
			// @ts-ignore
			// rehypeMath,
			// rehypeTypst,
			rehypeMath,
			[
				rehypeExternalLinks,
				{
					rel: [],
					target: "_blank",
				},
			],
			// @ts-ignore
			[rehypePrettyCode, prettyCodeOptions],
		],
	},
	experimental: {
		contentCollectionCache: true,
	},
	integrations: [icon(), UnoCSS(), svelte(), mdx(), typst(), sitemap()],
});
