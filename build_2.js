// ES6 version using asynchronous iterators, compatible with node v10.0+

const fs = require("fs");
const path = require("path");

async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}

const 覆盖 = (source, dest) => {
    fs.existsSync(dest) && fs.rmSync(dest);
    fs.cpSync(source, dest);
}

// Then, use it with a simple async for loop
async function main() {
    // 第一次运行的时候不用执行这里
    for await (const p of walk('./dist')) {
        console.log(p);
        const new_path = p.replace(/^dist/, "public");
        if (new_path.endsWith('.svg')) {
            console.log("\x1B[33m  └─Copy skipped.\x1B[0m");
            continue;
        };
        覆盖(p, new_path);
    }
}

main();