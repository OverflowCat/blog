// src/pages/api/[id].json.ts
import type { APIRoute } from "astro";
import { readFile, readdir } from "node:fs/promises";

export const GET: APIRoute = async ({ params, request }) => {
	const name = params.name;
	const svg = await readFile(`./src/icons/${name}.svg`);
	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};

export async function getStaticPaths() {
	const files = await readdir("./src/icons");
	const paths = files
		.filter((file) => file.endsWith(".svg"))
		.map((file) => {
			const name = file.replace(/\.svg$/, "");
			return {
				params: { name },
			};
		});
	return paths;
}
