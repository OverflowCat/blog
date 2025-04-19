import { z } from "astro:content";

export const dialData = z.object({
    wiki: z.string(),
    meaning: z.string().optional(),
    list: z.record(z.string(), z.array(z.string())),
});

export type DialData = z.infer<typeof dialData>;
