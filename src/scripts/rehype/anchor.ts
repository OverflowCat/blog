import rehypeAutolinkHeadings, { type Options } from "rehype-autolink-headings";
export default [
	rehypeAutolinkHeadings,
	{
		content: [
			{
				type: "element",
				tagName: "span",
				properties: { className: ["anchor"] },
				children: [{ type: "text", value: "#" }],
			},
		],
		behavior: "append",
	} satisfies Options,
];
