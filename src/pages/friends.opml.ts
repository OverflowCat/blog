import { generateFeedOpml } from "@/scripts/opml";
import type { APIRoute } from "astro";

export async function GET(_: APIRoute) {
    return new Response(
      generateFeedOpml(),
    )
  }
