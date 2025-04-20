export function zhWiki(entry: string) {
    return `https://zh.wikipedia.org/wiki/${encodeURIComponent(entry)}`;
}

export function enWiki(entry: string) {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(entry)}`;
}

export function enWikt(entry: string, hash?: string) {
    return `https://en.wiktionary.org/wiki/${encodeURIComponent(entry)}${hash ? `#${hash}` : ""}`;
}

export function wikiLink(entry: string) {
    if (entry.startsWith("zh:")) return zhWiki(entry.slice(3));
    return enWiki(entry);
}
