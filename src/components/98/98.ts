export type Heading = {
  id?: string;
  depth: number;
  text: string;
};

export type TocNode = {
  slug: string;
  depth: number;
  text: string;
  children: TocNode[];
};

export function genTocTree(toc: any[]): TocNode {
  const root: any = { slug: "", depth: 1, text: "文章", children: [] };
  let node = root;
  let parents = [root];
  for (const item of toc) {
    while (item.depth <= node.depth) {
      node = parents.pop()!;
    }
    if (node.children === undefined) node.children = [];
    node.children.push(item);
    parents.push(node);
    node = item;
  }
  root.children.push({
    slug: "comments",
    depth: 1,
    text: "评论",
    children: [],
  });
  return root;
}

export function renderTree(node: TocNode): string {
  const childTree = node.children
    ?.map((child) => renderTree(child))
    .map((x) => `<li>${x}</li>`)
    .join("");
  if (childTree)
    return `<a href="#${node.slug}">${node.text}</a><ul>${childTree}</ul>`;
  return `<a href="#${node.slug}">${node.text}</a>`;
}
