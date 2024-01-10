export interface OpenGraphData {
  title: string;
  description: string;
  image?: PathToSupportedImage;
  url: string;
  type?: string;
}

export type PathToSupportedImage = `${string}.${"png" | "jpg" | "jpeg"}`;
export function toSupportedImage(s: string): PathToSupportedImage {
  if (/ /.test(s)) {
    s = s.split(" ")[0]
  }
  if (s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg")) {
    return s as PathToSupportedImage;
  }
  throw new Error("Unsupported image format");
}

export function genOpenGraphMetas(data: OpenGraphData) {
  const pngLogo =
    "https://user-images.githubusercontent.com/20166026/252747732-d43d721d-1aea-4762-bd9e-7e48f7186bce.png";
  return {
    "og:title": data.title,
    "og:description": data.description,
    "og:image": data.image || pngLogo,
    "og:url": data.url,
    "og:type": data.type ?? "article",
    "twitter:card": "summary_large_image",
    "twitter:site": "@lazy_static",
    "twitter:creator": "@lazy_static",
    "twitter:description": data.description,
    "twitter:image": data.image || pngLogo,
  };
}
