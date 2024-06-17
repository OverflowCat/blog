export type Heading = {
  id?: string;
  level: number;
  text: string;
};

export type TocNode = {
  id: string;
  level: number;
  text: string;
  children: TocNode[];
};

export function genTocTree(toc: any[]): TocNode {
  const root: any = { id: "", level: 1, text: "文章", children: [] };
  let node = root;
  let parents = [root];
  for (const item of toc) {
    while (item.level <= node.level) {
      node = parents.pop()!;
    }
    if (node.children === undefined) node.children = [];
    node.children.push(item);
    parents.push(node);
    node = item;
  }
  root.children.push({
    id: "comments",
    level: 1,
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
    return `<a href="#${node.id}">${node.text}</a><ul>${childTree}</ul>`;
  return `<a href="#${node.id}">${node.text}</a>`;
}
