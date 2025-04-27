export interface Feed {
    title: string;
    url: string;
    href: string;
    desc: string;
}

const feeds = new Map<string, Feed>();

export function collect(feed: Feed) {
    feeds.set(feed.url, feed);
}

export function get() {
    return Array.from(feeds.values());
}
