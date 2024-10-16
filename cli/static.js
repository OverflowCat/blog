import fs from "fs";

const entries = [
    ["./src/posts/weekly/0x07/tart.jpg", "./dist/tart.jpg"],
    ["./dist/_astro/paw-licking.v22o3NZL_27GX7V.png", "./dist/_astro/paw-licking.v22o3NZL_RdBpb.png"]
]

for (const [src, dest] of entries) {
    try {
        fs.rmSync(dest, { recursive: true });
    } catch (_) {}
    fs.copyFileSync(src, dest);
}
