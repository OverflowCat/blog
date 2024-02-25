// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
const ICON_PACKS = new Set(
  `clarity, codicon, entypo-social, gravity-ui, ic, icon-park, mdi, ph, ri, simple-icons, tabler`.split(
    ", "
  )
);
// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ _image }: any) =>
    z.object({
      title: z.string(),
      tags: z.optional(z.union([z.string(), z.array(z.string())])),
      photo: z.string().optional(), // photo: image().optional(),
      figcaption: z.string().optional(),
      date: z.date(),
      draft: z.boolean().optional(),
      categories: z.optional(z.union([z.string(), z.array(z.string())])),
      description: z.string().optional(),
      icon: z
        .string()
        .refine(
          (x: string) => !x.includes(":") || ICON_PACKS.has(x.split(":")[0])
        )
        .optional(),
      mathjax: z.boolean().optional(),
      hide_title: z.boolean().optional(),
      hide_cover: z.boolean().optional(),
      noscript: z.boolean(),
      licence: z.union([
        z.literal("CcByNc"),
        z.literal("CcBySa"),
        z.literal("PD"),
        z.string().nullable(),
        z.literal(false),
        z.undefined(),
      ]),
      paper: z.boolean().optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
};
