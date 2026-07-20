export interface OpenGraphData {
  title: string;
  description: string;
  image?: string;
  video?: string;
  url: string;
  type?: string;
}

export function genOpenGraphMetas(data: OpenGraphData, site: URL) {
  let ogImage = "";
  if (data.image) {
    ogImage = data.image;
    if (ogImage.startsWith("/")) ogImage = site + data.image;
  }
  let ogVideo = "";
  if (data.video) {
    ogVideo = data.video;
    if (ogVideo.startsWith("/")) ogVideo = site + data.video;
  }
  const metas: Record<string, string> = {
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
  if (ogVideo) {
    metas["og:video"] = ogVideo;
    metas["og:video:url"] = ogVideo;
  }
  return metas;
}
