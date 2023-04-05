import { defineConfig } from 'astro/config';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// math
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";

// https://astro.build/config
import compress from "astro-compress";

import rehypePrettyCode from "rehype-pretty-code";
// https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/

const prettyCodeOptions = {
  theme: "slack-ochin",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
  outDir: "../dist/",
  integrations: [svelte(), mdx(), compress({
    path: "../dist/", // !!
    // css: false,
    // html: false,
    img: false,
    js: false,
    svg: false,
  })],
  markdown: {
    remarkRehype: { footnoteLabel: "脚注和参考文献", footnoteBackLabel: "返回内容" },
    // remarkPlugins: [remarkMath],
    // rehypePlugins: [rehypeKatex]
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  }
});