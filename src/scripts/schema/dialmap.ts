import { z } from "astro:content";

export const dialData = z.object({
    /** Mandarin formal form */
    wiki: z.string(),
    /** English meaning of the headword */
    meaning: z.string().optional(),
    /** Phrases */
    list: z.record(z.string(), z.array(z.string())),
});

export type DialData = z.infer<typeof dialData>;
