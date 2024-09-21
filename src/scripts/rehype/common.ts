import rehypeMultiMath from "./math.ts";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { transformerTwoslash } from '@shikijs/twoslash';

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
    ],
    onVisitLine(node: PrettyCodeNode) {
        if (node.children.length === 0) {
            node.children = [{
                type: "text",
                value: " "
            }];
        }
    },
    onVisitHighlightedLine(node: PrettyCodeNode) {
        // node.properties.className?.push("highlighted");
        if (node.properties.className === undefined) node.properties.className = [];
        node.properties.className.push("highlighted");
    },
    onVisitHighlightedWord(node: PrettyCodeNode) {
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
]
