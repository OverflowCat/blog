import { z } from "astro:content";

const ExternalResourceSchema = z.object({
  url: z.string().url(),
});

const LocalizedTextSchema = z.object({
  lang: z.string(),
  text: z.string(),
});

export const gameSchema = z.object({
  id: z.string().url(),
  type: z.literal('Game'),
  uuid: z.string(),
  url: z.string(),
  api_url: z.string(),
  category: z.literal('game'),
  parent_uuid: z.string().nullable(),
  display_title: z.string(),
  external_resources: z.array(ExternalResourceSchema),
  title: z.string(),
  description: z.string(),
  localized_title: z.array(LocalizedTextSchema),
  localized_description: z.array(LocalizedTextSchema),
  cover_image_url: z.string().url(),
  rating: z.number().nullable(),
  rating_count: z.number(),
  brief: z.string(),
  genre: z.array(z.string()),
  developer: z.array(z.string()),
  publisher: z.array(z.string()),
  platform: z.array(z.string()),
  release_type: z.string().nullable(),
  release_date: z.string(),
  official_site: z.string().nullable(),
});

export type Game = z.infer<typeof gameSchema>;

export const movieSchema = z.object({
  id: z.string().url(),
  type: z.literal('Movie'),
  uuid: z.string(),
  url: z.string(),
  api_url: z.string(),
  category: z.literal('movie'),
  parent_uuid: z.string().nullable(),
  display_title: z.string(),
  external_resources: z.array(ExternalResourceSchema),
  title: z.string(),
  description: z.string(),
  localized_title: z.array(LocalizedTextSchema),
  localized_description: z.array(LocalizedTextSchema),
  cover_image_url: z.string().url(),
  rating: z.number(),
  rating_count: z.number(),
  brief: z.string(),
  genre: z.array(z.string()),
  director: z.array(z.string()),
  playwright: z.array(z.string()),
  actor: z.array(z.string()),
  language: z.array(z.string()),
  area: z.array(z.string()),
  year: z.number(),
});
export type Movie = z.infer<typeof movieSchema>;

export const neoSchema = z.union([gameSchema, movieSchema]);
export type NeoItem = z.infer<typeof neoSchema>;
