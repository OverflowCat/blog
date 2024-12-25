import type { APIRoute } from "astro";
import fs from "node:fs/promises";

export async function GET(_: APIRoute) {
	const content = await fs.readFile("node_modules/@moonbit/moonpad/dist/lsp-server.js", "utf8");

	return new Response(content, {
		headers: {
			"Content-Type": "application/javascript",
		},
	});
}
