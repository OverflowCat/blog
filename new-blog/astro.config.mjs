import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.xinshijiededa.men',
  integrations: [mdx(), sitemap(), svelte()],
  markdown: {
    remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex],
  }
});
