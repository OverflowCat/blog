import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import * as sass from "sass";
import * as embedded from "sass-embedded";

test("embedded Sass preserves Carbon and local component CSS", async () => {
	const root = new URL("../", import.meta.url);
	const modules = new URL("node_modules/", root);
	const packages = await readdir(new URL(".pnpm/", modules));
	const loadPaths = [
		fileURLToPath(modules),
		...packages
			.filter((name) => name.startsWith("@carbon+"))
			.map((name) => fileURLToPath(new URL(`.pnpm/${name}/node_modules/`, modules))),
	];
	const components = new URL("src/components/carbon/", root);
	const files = [
		new URL("src/layouts/Carbon.scss", root),
		...(await readdir(components))
			.filter((name) => name.endsWith(".scss"))
			.map((name) => new URL(name, components)),
	];
	for (const file of files) {
		const options = { loadPaths, logger: sass.Logger.silent };
		const expected = await sass.compileAsync(fileURLToPath(file), options);
		const actual = await embedded.compileAsync(fileURLToPath(file), options);
		assert.equal(actual.css, expected.css, file.pathname);
	}
});
