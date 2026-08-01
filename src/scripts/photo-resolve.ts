import type { ImageObject } from "./schema/photo";

/**
 * Cascade resolution for the three image concepts.
 *
 * `photo` is the base/default for all three (article cover, Open Graph, and
 * list-card thumbnail). `og` and `thumb` override it: when omitted they fall
 * back to `photo`; when set to `false` they suppress that concept entirely.
 */

/** Article-page cover — it IS the base `photo`. */
export function resolveCover(d: { photo?: ImageObject }): ImageObject | undefined {
	return d.photo;
}

/** List-card thumbnail — `false` suppresses, else override or fall back to `photo`. */
export function resolveThumb(d: {
	photo?: ImageObject;
	thumb?: ImageObject | false;
}): ImageObject | undefined {
	if (d.thumb === false) return undefined;
	return d.thumb ?? d.photo;
}

/** Open Graph image — `false` suppresses, else override or fall back to `photo`. */
export function resolveOg(d: {
	photo?: ImageObject;
	og?: ImageObject | false;
}): ImageObject | undefined {
	if (d.og === false) return undefined;
	return d.og ?? d.photo;
}
