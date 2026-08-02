import { z } from "astro/zod";
export const decoration = z.union([
    z.literal("planet"),
    z.literal("binary"),
    z.literal("world"),
    z.literal("langs"),
    z.literal("harmony"),
    z.literal("isekai"),
    z.null(),
]);

export type Decoration = z.infer<typeof decoration>;
