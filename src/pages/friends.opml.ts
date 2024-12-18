import { generateFeedOpml } from "@/scripts/opml";
import type { APIRoute } from "astro";

const encoder = new TextEncoder();

export async function GET(_: APIRoute) {
  const opml = generateFeedOpml();
  const encodedOpml = encoder.encode(opml);
  return new Response(encodedOpml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
  // return {
  //   body: opml,
  //   headers: {
  //     "Content-Type": "application/xml; charset=utf-8"
  //   },
  // }
}
