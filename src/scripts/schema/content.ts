import type { SchemaContext } from "astro:content";
import { z } from "astro/zod";
import taxonomyData, { type Category, type Tag } from "@/scripts/taxonomy-data";
import { decoration } from "../decoration";
import imageObject from "./photo";

// 2. Define a `type` and `schema` for each collection
const CATEGORY_VALUE_TYPE = z.enum(
	Object.keys(taxonomyData.categories) as [Category, ...Category[]],
);
const TAG_VALUE_TYPE = z.enum(
	Object.keys(taxonomyData.tags) as [Tag, ...Tag[]],
);

const CATEGORY_TYPE = z
	.union([CATEGORY_VALUE_TYPE, z.array(CATEGORY_VALUE_TYPE)])
	.nullish()
	.transform((value) =>
		value == null ? [] : Array.isArray(value) ? value : [value],
	);
const TAG_TYPE = z
	.union([TAG_VALUE_TYPE, z.array(TAG_VALUE_TYPE)])
	.nullish()
	.transform((value) =>
		value == null ? [] : Array.isArray(value) ? value : [value],
	);

const SERIES_TYPE = z
	.union([z.literal("weekly"), z.literal("harmony"), z.literal("六不答對")])
	.nullish();

const LICENCE_TYPE = z.union([
	z.literal("CcBy"),
	z.literal("CcBySa"),
	z.literal("CcBySa4.0"),
	z.literal("CcByNc"),
	z.literal("CcByNd"),
	z.literal("CcByNcSa"),
	z.literal("CcByNcNd"),
	z.literal("Minzoku"),
	z.literal("PD"),
	z.literal("KOGL"),
]);

const LICENCE_PART = z.object({
	type: z.union([
		z.literal("own"),
		z.literal("use"),
		z.literal("translate from"),
	]),
	licence: LICENCE_TYPE,
	source: z.string().url().optional(),
	author: z.string().optional(),
	usage: z.string().optional(),
});

export type LicenceType = z.infer<typeof LICENCE_TYPE>;
export type LicencePartType = z.infer<typeof LICENCE_PART>;

export const postSchemaGen = (ctx: SchemaContext) =>
	z
		.object({
			title: z.string(),
			categories: CATEGORY_TYPE,
			tags: TAG_TYPE,
			series: SERIES_TYPE,
			photo: imageObject(ctx.image).optional(),
			// Open Graph image override. Omit → fall back to `photo`;
			// `false` → suppress the OG image even if `photo` is set.
			og: z.union([imageObject(ctx.image), z.literal(false)]).optional(),
			// List-card thumbnail override. Same cascade semantics as `og`.
			thumb: z.union([imageObject(ctx.image), z.literal(false)]).optional(),
			date: z.coerce.date(),
			// card: z.union([
			// 	z.literal("mini"), // 1x1
			// 	z.literal("tall"), // 1x2
			// 	z.literal("portrait"), // 1x2
			// 	z.literal("wide"), // 2x1
			// 	z.literal("landscape"), // 2x1, image only
			// 	z.literal("large"), // 2x2
			// ]).optional(),
			card: z.string().optional(),
			draft: z
				.boolean()
				.optional()
				.transform((x) => (x === undefined ? false : x)), // TODO: remove this
			visibility: z
				.union([z.literal("public"), z.literal("unlisted")])
				.optional(),
			desc: z.string().optional(),
			icon: z.string().optional(),
			decoration: decoration.optional(),
			lang: z
				.union([
					// 汉语
					z.literal("cmn"),
					// 淮语
					z.literal("juai"),
					// 满语
					z.literal("mnc"),
					// 英语
					z.literal("en"),
					// 日本語
					z.literal("ja"),
					// 壮语
					z.literal("za"),
				])
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
				LICENCE_TYPE,
				z.array(LICENCE_PART),
				z.string().nullable(),
				z.literal(false),
				z.undefined(),
			]),
			paper: z.boolean().default(true),
			ext: z
				.union([z.literal("md"), z.literal("mdx"), z.literal("typ")])
				.nullish(),
			resizable: z.boolean().default(true),
			hant: z.boolean().optional(),
			vert: z.boolean().optional(),
			theme: z.boolean().or(z.string()).optional(),
			base: z.string().url().optional(), // base URL for URL-only img
			video: z.string().optional(), // Open Graph video URL
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
				if (data.math === "typst") if (data.vert !== true) data.vert = false;
			}
			if (data.vert === undefined) data.vert = false;
			if (data.hant === undefined) data.hant = false;
			return data;
		});
