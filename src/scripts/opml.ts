interface Feed {
    title: string;
    url: string;
    href: string;
    desc: string;
}

let feeds = new Map<string, Feed>();

function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

function u(input: string) {
    return Array.from(input).map(char => {
        const codePoint = char.codePointAt(0)!.toString(16).toUpperCase();
        return `&#x${codePoint};`;
    }).join('');
}

export function generateFeedOpml() {
    const feedList: string[] = [];
    feeds.values()
        .forEach(
            (feed) => feedList.push(`
<outline
    text="${u(escapeXml(feed.title))}"
    title="${u(escapeXml(feed.title))}"
    type="rss"
    xmlUrl="${feed.url}"
    htmlUrl="${feed.href}"
    description="${u(escapeXml(feed.desc))}"
/>`
            ));
    if (feedList.length === 0) {
        throw new Error("No feeds collected");
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>Subscriptions</title>
    </head>
    <body>
        ${feedList.join("")}
    </body>
</opml>`;
}


export function collect(feed: Feed) {
    feeds.set(feed.url, feed);
}
