import { readFile } from "node:fs/promises";
import { locate } from "@iconify/json";
import { getIconData, iconToHTML, iconToSVG } from "@iconify/utils";

type IconSet = Parameters<typeof getIconData>[0];

const iconSetCache = new Map<string, Promise<IconSet>>();
const svgCache = new Map<string, Promise<string>>();

function cachedPromise<T>(
	cache: Map<string, Promise<T>>,
	key: string,
	load: () => Promise<T>,
) {
	const cached = cache.get(key);
	if (cached) return cached;

	const pending = load();
	cache.set(key, pending);
	pending.catch(() => {
		if (cache.get(key) === pending) cache.delete(key);
	});
	return pending;
}

function loadIconSet(prefix: string) {
	return cachedPromise(iconSetCache, prefix, async () => {
		const source = await readFile(locate(prefix), "utf8");
		return JSON.parse(source) as IconSet;
	});
}

async function loadIcon(prefix: string, name: string) {
	if (prefix) return getIconData(await loadIconSet(prefix), name);

	// Resolve against the project root (CWD), not import.meta.url: during
	// prerender import.meta.url points into dist/.prerender/chunks and the SVG
	// is never copied there. Astro builds always run with CWD = project root.
	const source = await readFile(`src/icons/${name}.svg`, "utf8");
	return {
		body: source,
		width: Number.parseInt(
			source.match(/ width="(\d+)(px)?"/)?.[1] ?? "32",
			10,
		),
		height: Number.parseInt(
			source.match(/ height="(\d+)(px)?"/)?.[1] ?? "32",
			10,
		),
	};
}

export function renderIcon(prefix: string, name: string, height = "1em") {
	const key = `${prefix}:${name}:${height}`;
	return cachedPromise(svgCache, key, async () => {
		const data = await loadIcon(prefix, name);
		if (!data) throw new Error(`Icon not found: ${prefix}:${name}`);

		const svg = iconToSVG(data, { height });
		return iconToHTML(svg.body, svg.attributes);
	});
}
