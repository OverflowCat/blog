import { defineConfig } from "astro/config";

// astro
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
// import rehypeTypst from "@myriaddreamin/rehype-typst";

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
]

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
      external: ["prismjs"],
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
  integrations: [icon(), UnoCSS(), svelte(), mdx(), sitemap()],
});
