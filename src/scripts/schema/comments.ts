import { z } from "astro/zod";

export const commentsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  url: z.string().optional(),
  twitter: z.string().optional(),
  activitypub: z.string().optional(),
  format: z.enum(["markdown", "html"]).optional(),
  // date: z.string().pipe(z.coerce.date()),
  ua: z.string().optional(),
  date: z.coerce.date(),
  reply: z.string().optional(),
});

export type Comments = z.infer<typeof commentsSchema>;
