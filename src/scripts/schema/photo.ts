import { z, type SchemaContext } from "astro:content";

export default (image: SchemaContext['image']) => z.object({
    src: z.string().optional(),
    img: image().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    aspect: z.string().refine((x) => {
        const [x1, x2] = x.split(":").map(Number);
        return x1 > 0 && x2 > 0;
    }).optional(),
    hide: z
        .boolean()
        .optional()
        .transform((x) => (x === undefined ? false : x)),
});
