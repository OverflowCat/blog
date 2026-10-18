import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
import { createHighlighter } from "shiki";
import lazyTwoslash from "../src/scripts/rehype/lazy-twoslash.ts";

test("lazy Twoslash preserves upstream output and loads TypeScript only for accepted snippets", async () => {
	const require = createRequire(import.meta.url);
	const typescript = require.resolve("typescript");
	assert.equal(require.cache[typescript], undefined);
	const highlighter = await createHighlighter({
		themes: ["snazzy-light"],
		langs: ["javascript", "typescript", "tsx", "python", "json"],
	});
	const lazy = lazyTwoslash();
	const render = (transformer, code, lang, meta = "") =>
		highlighter.codeToHtml(code, {
			lang,
			theme: "snazzy-light",
			meta: { __raw: meta },
			transformers: [transformer],
		});
	try {
		const skipped = [
			['console.log("hello")', "javascript"],
			['print("hello")', "python"],
			['{"hello": true}', "json"],
			['const x: number = "invalid"', "ts", "notwoslash"],
			['const x: number = "invalid"', "typescript", "no-twoslash"],
		];
		const skippedOutput = skipped.map((args) => render(lazy, ...args));
		assert.equal(require.cache[typescript], undefined);

		const snippet = 'const greeting = "hello";\ngreeting\n// ^?';
		const actual = render(lazy, snippet, "ts");
		assert.ok(require.cache[typescript]);
		assert.match(actual, /twoslash/);
		const { transformerTwoslash } = require("@shikijs/twoslash");
		const eager = transformerTwoslash();
		assert.equal(actual, render(eager, snippet, "ts"));
		for (const [i, args] of skipped.entries()) {
			assert.equal(skippedOutput[i], render(eager, ...args));
			assert.equal(render(lazy, ...args), skippedOutput[i]);
		}
		for (const args of [
			[snippet, "typescript"],
			[snippet, "tsx", "twoslash"],
			['// @errors: 2322\nconst value: string = 123;', "ts"],
			['const shared = 42;', "ts", "include shared"],
			['// @include: shared\nshared\n// ^?', "ts"],
		]) {
			assert.equal(render(lazy, ...args), render(eager, ...args));
		}
		assert.throws(() => render(lazy, 'const x: number = "invalid"', "ts"));
	} finally {
		highlighter.dispose();
	}
});
