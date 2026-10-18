import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { createMarkdownProcessor, unified } from "@astrojs/markdown-remark";
import * as OpenCC from "opencc-js";
import remarkMath from "remark-math";
import { convertToHant, prepareHant } from "../src/scripts/cc.ts";
import rehypeChinese from "../src/scripts/rehype/cc.ts";
import rehypeMultiMath from "../src/scripts/rehype/math.ts";
import { renderIcon } from "../src/scripts/render-icon.ts";

const original = OpenCC.ConverterFactory(
	OpenCC.Locale.from.cn,
	OpenCC.Locale.to.twp.concat([
		[
			["扩展字", "擴充字"],
			["扩展", "擴充"],
		],
	]),
);
const expected = (text) =>
	original(text).replaceAll(' lang="zh-Hans"', ' lang="zh-Hant"');

test("conversion agrees with OpenCC for every CN/TWP dictionary key", () => {
	for (const group of [...OpenCC.Locale.from.cn, ...OpenCC.Locale.to.twp]) {
		for (const dict of group) {
			const entries =
				typeof dict === "string"
					? dict.split("|").map((line) => line.split(" "))
					: dict;
			for (const [key] of entries)
				assert.equal(convertToHant(key), expected(key), key);
		}
	}
});

test("conversion agrees with the previous implementation across all post sources", async () => {
	for (const file of await readdir(new URL("../src/posts/", import.meta.url), {
		recursive: true,
	})) {
		if (!/\.(md|mdx|typ)$/.test(file)) continue;
		const source = await readFile(
			new URL(`../src/posts/${file}`, import.meta.url),
			"utf8",
		);
		assert.equal(convertToHant(source), expected(source), file);
	}
});

test("prepared conversions survive serialization and retain dynamic HTML fallback", () => {
	const prepared = new Map();
	prepareHant("扩展字与SQL注入，B超和U盘", prepared);
	const html =
		'<section lang="zh-Hans"><p>扩展字与SQL注入，B超和U盘</p><p>动态生成的软件</p><svg viewBox="0 0 10 20"><path d="M0 1L2 3"/></svg></section>';
	assert.equal(
		convertToHant(html, JSON.parse(JSON.stringify([...prepared]))),
		expected(html),
	);
	assert.equal(
		convertToHant("<svg>" + "M1234567890".repeat(10000) + "</svg>"),
		"<svg>" + "M1234567890".repeat(10000) + "</svg>",
	);
});

test("rehype records conversions without altering original HTML, headings or images", async () => {
	const renderer = await createMarkdownProcessor({
		syntaxHighlight: false,
		rehypePlugins: [rehypeChinese],
	});
	const result = await renderer.render(
		"# 扩展字\n\n[软件](https://example.org/软件)\n\n![图片](./photo.png)",
		{
			fileURL: new URL("../src/posts/performance.md", import.meta.url),
			frontmatter: {},
		},
	);
	assert.match(result.code, /扩展字/);
	assert.equal(result.metadata.headings[0].text, "扩展字");
	assert.deepEqual(result.metadata.localImagePaths, ["./photo.png"]);
	assert.ok(
		result.metadata.frontmatter.hantReplacements.some(
			([from, to]) => from === "扩展字" && to === expected("扩展字"),
		),
	);
	assert.equal(
		convertToHant(result.code, result.metadata.frontmatter.hantReplacements),
		expected(result.code),
	);
	const comment = await renderer.render("评论", {
		fileURL: new URL("../src/comments/test.md", import.meta.url),
		frontmatter: {},
	});
	assert.equal(comment.metadata.frontmatter.hantReplacements, undefined);
});

test("MDX exports prepared conversions while keeping expressions and components", async () => {
	const renderer = await unified({
		rehypePlugins: [rehypeChinese],
	}).createMdxRenderer(
		{ syntaxHighlight: false },
		{ srcDir: new URL("../src/", import.meta.url), optimize: true },
	);
	const result = await renderer.process(
		'import Card from "./Card.astro";\n\n# 扩展字\n\n<Card>{"动态软件"}</Card>',
		"/project/src/posts/test.mdx",
		{},
	);
	assert.match(result.code, /hantReplacements/);
	assert.ok(result.code.includes(expected("扩展字")));
	assert.match(result.code, /Card/);
	assert.match(result.code, /动态软件/);
});

test("math is skipped for ordinary text, rendered on demand, and does not leak between documents", async () => {
	const renderer = await createMarkdownProcessor({
		syntaxHighlight: false,
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMultiMath],
	});
	const plain = await renderer.render("A plain paragraph", { frontmatter: {} });
	assert.equal(plain.code, "<p>A plain paragraph</p>");
	for (const math of ["katex", "mathjax"]) {
		const formula = await renderer.render("$x^2$", { frontmatter: { math } });
		assert.match(
			formula.code,
			math === "katex" ? /class="katex"/ : /mjx-container/,
		);
		const next = await renderer.render("No formula", { frontmatter: { math } });
		assert.equal(next.code, "<p>No formula</p>");
	}
});

test("Iconify renders collections and local SVGs and shares concurrent cache requests", async () => {
	const first = renderIcon("mdi", "home");
	assert.equal(first, renderIcon("mdi", "home"));
	assert.match(await first, /<svg.*viewBox="0 0 24 24"/);
	assert.match(await renderIcon("carbon", "calendar", "2em"), /height="2em"/);
	assert.match(await renderIcon("", "harmony-calendar-badge-clock"), /<svg/);
	await assert.rejects(
		renderIcon("mdi", "this-icon-does-not-exist"),
		/Icon not found/,
	);
});
