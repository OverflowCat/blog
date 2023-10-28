import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// sitemap
import sitemap from "@astrojs/sitemap";

// math
import remarkMath from "remark-math";
import rehypeMathRenderer from "rehype-mathjax";

import rehypePrettyCode from "rehype-pretty-code";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

import rehypeExternalLinks from "rehype-external-links";

// @ts-ignore
import remarkFigureCaption from "@microflash/remark-figure-caption";

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

// https://astro.build/config
export default defineConfig({
  site: "https://blog.xinshijiededa.men",
  vite: {
    ssr: {
      noExternal: ["modern-css-reset"],
    },
  },
  markdown: {
    remarkRehype: {
      footnoteLabel: "---",
      footnoteBackLabel: "返回内容",
    },
    syntaxHighlight: false,
    remarkPlugins: [remarkMath, remarkFigureCaption],
    rehypePlugins: [
      // TODO
      // @ts-ignore
      rehypeMathRenderer,
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
  integrations: [
    svelte(),
    mdx(),
    sitemap(),
  ],
});
