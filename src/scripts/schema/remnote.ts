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

export async function getRemnotes(path: string): Promise<{ id: string, path: string }[]> {
    const files = await fs.readdir(path);
    return files.map((file) => ({
        id: file.split(".")[0], path: path + "/" + file
    }));
}

export const remnoteSchema = z.object({
    id: z.string(),
    path: z.string(),
});

export type Remnote = z.infer<typeof remnoteSchema>;
