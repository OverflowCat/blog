import { z } from "astro/zod";
import type { SchemaContext } from "astro:content";

/**
 * An image object usable as a frontmatter image field.
 *
 * `src` is a remote/legacy URL rendered as a plain `<img>`; `img` is a local
 * Astro asset (via `image()`) rendered as an optimized `<Picture>`. The two
 * are an intentional either/or — many covers cannot be bundled locally, so
 * `src` exists as a passthrough while `img` gets AVIF/WebP/JPG optimization.
 */
export const imageObject = (image: SchemaContext['image']) => z.object({
	src: z.string().optional(),
	img: image().optional(),
	alt: z.string().optional(),
	caption: z.string().optional(),
	aspect: z.string().refine((x) => {
		const [x1, x2] = x.split(":").map(Number);
		return x1 > 0 && x2 > 0;
	}).optional(),
});

export default imageObject;

/** Inferred shape of an image object ({ src?, img?, alt?, caption?, aspect? }). */
export type ImageObject = z.infer<ReturnType<typeof imageObject>>;
