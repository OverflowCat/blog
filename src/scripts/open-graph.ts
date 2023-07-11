export interface OpenGraphData {
  title: string;
  description: string;
  image?: PathToSupportedImage;
  url: string;
  type?: string;
}

export type PathToSupportedImage = `${string}.${"png" | "jpg" | "jpeg"}`;

export function genOg(data: OpenGraphData) {
  return {
    "og:title": data.title,
    "og:description": data.description,
    "og:image": data.image || "",
    "og:url": data.url,
    "og:type": data.type ?? "article",
    "twitter:card": "summary_large_image",
    "twitter:site": "@lazy_static",
    "twitter:creator": "@lazy_static",
    "twitter:description": data.description,
    "twitter:image": data.image || "",
  };
}
