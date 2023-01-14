import { defineConfig } from 'astro/config';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
    outDir: "../dist/",
    integrations: [svelte(), mdx()],
    markdown: {
        remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex],
    }
});