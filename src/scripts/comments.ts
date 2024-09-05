import { getCollection } from "astro:content";
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
const rawComments = await getCollection("comments");
type RawComment = ArrayElement<typeof rawComments>;
// export type Slug<T extends File> = T extends `${infer FolderPath}/${infer FileName}` ? FolderPath : never;
function getPath(id: RawComment["id"]) {
  return id.split("/").slice(0, -1).join("/");
}

const comments = rawComments
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .map((x) => {
    const slug = getPath(x.id);
    return {
      ...x,
      slug,
    };
  });

export type TransformedComment = ArrayElement<typeof comments>;

export const getComments = (slug: string) => {
  return comments.filter((x) => x.slug === slug);
};

export const getAllComments = () => {
  return comments;
};
