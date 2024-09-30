import { z, type SchemaContext } from "astro:content";
import { ICON_PACKS_SET } from "../icons";
import photo from "./photo";

// 2. Define a `type` and `schema` for each collection
function transform2arr(val: null | undefined | string | string[]) {
	if (!val) {
		return [];
	}
	if (typeof val === "string") {
		return [val];
	}
	return val;
}
const TAG_TYPE = z
	.union([z.string(), z.array(z.string())])
	.nullish()
	.transform(transform2arr);

export const blogSchema = (ctx: SchemaContext) => z
	.object({
		title: z.string(),
		categories: TAG_TYPE,
		tags: TAG_TYPE,
		photo: photo(ctx.image).optional(),
		date: z.coerce.date(),
		draft: z
			.boolean()
			.optional()
			.transform((x) => (x === undefined ? false : x)), // TODO: remove this
		visibility: z
			.union([z.literal("public"), z.literal("unlisted")])
			.optional(),
		description: z.string().optional(),
		icon: z
			.string()
			.refine(
				(x: string) => !x.includes(":") || ICON_PACKS_SET.has(x.split(":")[0]),
			)
			.optional(),
		math: z.optional(
			z.union([z.literal("mathjax"), z.literal("katex"), z.literal("typst")]),
		),
		hide_title: z
			.boolean()
			.optional()
			.transform((x) => (x === undefined ? false : x)),
		noscript: z.boolean(),
		licence: z.union([
			z.literal("CcByNc"),
			z.literal("CcBySa"),
			z.literal("PD"),
			z.string().nullable(),
			z.literal(false),
			z.undefined(),
		]),
		paper: z.boolean().default(true),
		resizable: z.boolean().default(true),
		hant: z.boolean().optional(),
		vert: z.boolean().optional(),
	})
	// .refine((data) => !(data.math && data.vert), {
	// 	message: "Math is not supported in vertical mode.",
	// })
	// .refine((data) => !(data.math === "typst" && data.hant), {
	// 	message: "OpenCC is not supported in Typst.",
	// })
	.transform((data) => {
		if (data.math) {
			if (data.hant !== true) data.hant = false;
			if (data.math === "typst")
				if (data.vert !== true) data.vert = false;
		}
		if (data.vert === undefined) data.vert = false;
		if (data.hant === undefined) data.hant = false;
		return data;
	})
