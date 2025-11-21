export interface OpenGraphData {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}

export function genOpenGraphMetas(data: OpenGraphData, site: URL) {
  let ogImage = "";
  if (data.image) {
    ogImage = data.image;
    if (ogImage.startsWith("/")) ogImage = site + data.image;
  }
  return {
    "og:title": data.title,
    "og:description": data.description,
    "og:image": ogImage,
    "og:url": data.url,
    "og:type": data.type ?? "article",
    "twitter:card": "summary_large_image",
    "twitter:site": "@lazy_static",
    "twitter:creator": "@lazy_static",
    "twitter:description": data.description,
    "twitter:image": data.image ?? "",
  };
}
