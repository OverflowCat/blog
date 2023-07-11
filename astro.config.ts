import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
import compress from "astro-compress";

import rehypePrettyCode from "rehype-pretty-code";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

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
    console.log(node);
    //node.properties.className?.push("highlighted");
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
  outDir: "./dist/",
  vite: {
    ssr: {
      noExternal: ["modern-css-reset"],
    },
  },
  markdown: {
    remarkRehype: {
      footnoteLabel: "脚注和参考文献",
      footnoteBackLabel: "返回内容",
    },
    remarkPlugins: [remarkMath, remarkFigureCaption],
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeKatex],
  },
  integrations: [
    svelte(),
    mdx(),
    compress({
      path: "../dist/", // !!
      // css: false,
      // html: false,
      img: false,
      js: false,
      svg: false,
    }),
  ],
});
