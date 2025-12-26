import { generateFeedOpml } from "@/scripts/opml";
import type { APIRoute } from "astro";


export async function GET(_: APIRoute) {
  const opml = await generateFeedOpml();
  return new Response(opml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
