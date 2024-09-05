import { z } from "astro:content";

export const commentsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  activitypub: z.string().optional(),
  format: z.enum(["markdown", "html"]).optional(),
  message: z.string(),
  date: z.string().pipe(z.coerce.date()),
  reply: z.string().optional(),
});

export type Comments = z.infer<typeof commentsSchema>;
