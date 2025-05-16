import rehypeMultiMath from "./math.ts";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
// @ts-ignore
import { transformerTwoslash } from '@shikijs/twoslash';
import { rehypeTwemoji, type RehypeTwemojiOptions } from 'rehype-twemoji'
import { getSingletonHighlighter } from "shiki";
import { shikiGitDiff } from "shiki-git-diff";
import CangjieLanguage from "./cangjie.tmLanguage.json";

type PrettyCodeNodePositionPoint = {
    line: number;
    column: number;
    offset: number;
};
interface PrettyCodeNode {
    type: string;
    tagName: string;
    properties: {
        className: string[] | undefined;
        "data-line": "";
    };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    children: any[];
    position: {
        start: PrettyCodeNodePositionPoint;
        end: PrettyCodeNodePositionPoint;
    };
}

const prettyCodeOptions: Options = {
    theme: "snazzy-light",
    keepBackground: false,
    transformers: [
        transformerTwoslash(),
        shikiGitDiff({
            condition: ctx => /\bdiff\b/.test(ctx?.options?.meta?.__raw),
        }),
    ],
    getHighlighter: (options) => getSingletonHighlighter({
        ...options,
        langs: [
            CangjieLanguage,
        ],
        langAlias: {
            cj: "cangjie",
        },
    }),
    onVisitLine(node) {
        if (node.children.length === 0) {
            node.children = [{
                type: "text",
                value: " "
            }];
        }
    },
    onVisitHighlightedLine(node) {
        // node.properties.className?.push("highlighted");
        if (node.properties.className === undefined) node.properties.className = [];
        node.properties.className.push("highlighted");
    },
    onVisitHighlightedChars(node) {
        node.properties.className = ["word"];
    },
    tokensMap: {}
};

export const rehypePipe = [
    rehypeMultiMath,
    [rehypeExternalLinks, {
        rel: [],
        target: "_blank"
    }],
    // @ts-ignore
    [rehypePrettyCode, prettyCodeOptions],
    [rehypeTwemoji, {} as RehypeTwemojiOptions],
]
