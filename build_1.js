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

function delete_generated_md(gitignorePath, dir) {
    fs.readFile(gitignorePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Failed to read file: ${gitignorePath}`, err);
            return;
        }
        const filesToIgnore = data.split('\n').map(line => line.trim()).filter(line => !!line);

        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(`Failed to read directory: ${dir}`, err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(dir, file);

                if (filesToIgnore.includes(file)) {
                    try {
                        const stats = fs.statSync(filePath);
                        if (stats.isFile()) {
                            fs.unlinkSync(filePath);
                            console.log(`File "${filePath}" has been deleted.`);
                        }
                    } catch (err) {
                        console.error(`Failed to delete file "${filePath}"`, err);
                    }
                }
            });
        });
    });
}

// Then, use it with a simple async for loop
async function main() {
    delete_generated_md('./source/_posts/.gitignore', './source/_posts');
    // 第二次运行的时候不用执行这里
    for await (const p of walk('./dist/pipe')) {
        console.log(p);
        if (/[\/\\]index\.html$/.test(p)) {
            const new_path = p.replaceAll("\\", '/')
                .replace(/\/index\.html$/, ".md")
                .replace(/^dist\/pipe/, "source/_posts");
            console.log(new_path);
            const frontmatter_yaml = new_path.replace("source/_posts/", "source/_frontmatters/").replace(/\.md$/, ".yaml");
            const frontmatter = "---\n" + fs.readFileSync(frontmatter_yaml, 'utf8').trim() + "\n---";
            const rendered = fs.readFileSync(p, "utf8")
                .replace(/^<!DOCTYPE html>/, "");
            fs.existsSync(new_path) && fs.rmSync(new_path);
            fs.writeFileSync(new_path, frontmatter + "\n\n" + rendered);
        }
    }
}

main();