import { z } from "astro:schema";
import fs from "fs/promises";

type Rem = {
    val: any;
    ch: Rem[];
}

export async function getRems(): Promise<{ id: string }[]> {
    const notes = await fs.readFile("./remnote.json", "utf-8");
    const rem: Rem = JSON.parse(notes);
    const ids: { id: string; val: any; ch: Rem[] }[] = [];
    function collect(node: Rem) {
        ids.push({ id: node.val._id, val: node.val, ch: node.ch });
        for (const child of node.ch) {
            collect(child);
        }
    }
    collect(rem);
    return ids;
}

export async function getRemnotes(path: string): Promise<{ id: string, path: string, content: string }[]> {
    const files = await fs.readdir(path);
    const result = [];
    for (const file of files) {
        const filePath = `${path}/${file}`;
        const content = await fs.readFile(filePath, 'utf-8');
        result.push({
            id: file.split(".")[0],
            path,
            content
        });
    }
    return result;
}

export const remnoteSchema = z.object({
    id: z.string(),
    path: z.string(),
    content: z.string(),
});

export const remnoteJsonSchema = z.object({
    val: z.any(),
    ch: z.any(),
});

export type Remnote = z.infer<typeof remnoteSchema>;
