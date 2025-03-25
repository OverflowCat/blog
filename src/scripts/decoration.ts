import { z } from "astro:content";
export const decoration = z.union([
    z.literal("planet"),
    z.literal("binary"),
    z.literal("world"),
    z.literal("langs"),
    z.literal("harmony"),
]);

export type Decoration = typeof decoration._type;
