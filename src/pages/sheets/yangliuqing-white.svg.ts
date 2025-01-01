import type { APIRoute } from "astro";
import fs from "node:fs/promises";

export async function GET(_: APIRoute) {
	let content = await fs.readFile("public/sheets/yangliuqing3z2.svg", "utf8");
	content = content.replace('<!-- background -->', '<path fill="#fff" fill-rule="evenodd" d="M0 0h2098.8v2977.2H0V0" />');
	return new Response(content, {
		headers: {
			"Content-Type": "image/svg+xml",
		},
	});
}
