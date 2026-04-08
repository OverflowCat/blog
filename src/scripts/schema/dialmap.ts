import { z } from "astro/zod";

export const dialData = z.object({
    /** Mandarin formal form */
    wiki: z.string(),
    /** English meaning of the headword */
    meaning: z.string().optional(),
    /** Phrases */
    list: z.record(z.string(), z.array(z.string())),
});

export type DialData = z.infer<typeof dialData>;
