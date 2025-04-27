import { experimental_AstroContainer } from "astro/container";

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
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const codepoint = char.codePointAt(0)!;
        if (codepoint < 0x80) return char;
        const hex = codepoint.toString(16).toUpperCase();
        return `&#x${hex};`;
    }).join('');
}

import Friends from "@/pages/friends/index.astro";
import { get } from "./opml-store";
export async function generateFeedOpml() {
    const container = await experimental_AstroContainer.create();

    const feedList: string[] = [];
    if (get().length === 0) {
        const _ = await container.renderToResponse(Friends);
    }
    if (get().length === 0) {
        throw new Error("No feeds collected");
    }
    for (const feed of get()) {
        feedList.push(`
<outline
    text="${u(escapeXml(feed.title))}"
    title="${u(escapeXml(feed.title))}"
    type="rss"
    xmlUrl="${feed.url}"
    htmlUrl="${feed.href}"
    description="${u(escapeXml(feed.desc))}"
/>`);
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

