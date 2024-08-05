import { parse } from "yaml";
import fs from "node:fs";
import { type } from "arktype";
import recursiveReaddirFiles from "recursive-readdir-files";
import { getBlogPosts } from "@/scripts/post";

export const CheckComment = type({
	id: "string",
	name: "string",
	email: "string",
	"website?": "string",
	"twitter?": "string",
	"activitypub?": "string",
	"format?": "'markdown'|'html'",
	message: "string",
	date: "any",
	"reply?": "string",
});

export type CheckedComment = typeof CheckComment.infer;

const articles = await getBlogPosts();

function readCommentFromSlug(path: string) {
	return readComment(`comments/${path}`);
}

function readComment(path: string) {
	const text = fs.readFileSync(path, {
		encoding: "utf-8",
	});
	const parsed = parse(text);
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	parsed["date"] = new Date(parsed["date"]);
	const out = CheckComment(parsed);
	if (out instanceof type.errors) {
		console.error(out);
		throw new Error("Invalid comment");
	}
	const slug = path
		.replaceAll("\\", "/")
		.split("comments/")
		.at(-1)
		?.split("/entry1")
		.at(0);
	if (!slug) throw new Error("Invalid yml file path, expected slug");
	Object.defineProperty(out, "slug", {
		value: slug,
		writable: false,
	});
	const article = articles.filter((x) => x.slug === slug)[0];
	Object.defineProperty(out, "title", {
		value: article.data.title,
		writable: false,
	});
	return out as CheckedComment & { slug: string; title: string };
}

const getYamlFilesBySlug = (slug: string) => {
	if (!fs.existsSync(`comments/${slug}/`)) {
		return [];
	}
	return fs
		.readdirSync(`comments/${slug}/`)
		.filter((file) => {
			return (
				file.startsWith("entry") &&
				(file.endsWith(".yml") || file.endsWith(".yaml"))
			);
		})
		.map((filename) => `${slug}/${filename}`);
};

export const getComments = (slug: string) =>
	getYamlFilesBySlug(slug)
		.map(readCommentFromSlug)
		.sort((a, b) => {
			return a.date.getTime() - b.date.getTime();
		});

export async function getAllComments() {
	const yamlFiles = await recursiveReaddirFiles("comments", {
		include: /\.ya?ml$/,
	});
	return yamlFiles
		.map((f) => f.path)
		.filter((p) => p.endsWith(".yaml") || p.endsWith(".yml"))
		.map(readComment)
		.toSorted(
			(a, b) => (b.date as Date).getTime() - (a.date as Date).getTime(),
		);
}
