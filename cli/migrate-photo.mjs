#!/usr/bin/env node
/**
 * Codemod: migrate legacy `photo` hide/list semantics to the new cascade model.
 *
 * Behavior-preserving mappings (see .mimocode/plans/1785528074447-stellar-rocket.md §7):
 *   photo:{… hide: true}            → rename block to `og:`, drop hide/list lines
 *                                    (these posts were effectively OG-only: today
 *                                    hide:true suppresses cover+card but OG still
 *                                    reads photo.src, ignoring hide).
 *   photo:{… hide: "list"}          → keep `photo`, drop hide line, add top-level
 *   photo:{… list: false}             `thumb: false` (cover yes, card no).
 *   photo:{…} (no hide/list)        → unchanged.
 *
 * Operates on the raw frontmatter string with line-level surgery (no YAML
 * round-trip, so comments and formatting are preserved). Defaults to dry-run;
 * pass --write to apply.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/posts";
const WRITE = process.argv.includes("--write");

/** Recursively collect .md/.mdx files under dir. */
function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		if (name.startsWith("_")) continue;
		const p = join(dir, name);
		const s = statSync(p);
		if (s.isDirectory()) out.push(...walk(p));
		else if (/\.(md|mdx)$/.test(name)) out.push(p);
	}
	return out;
}

/**
 * Parse the photo block out of frontmatter lines.
 * Returns { start, end, children } where start is the `photo:` line index,
 * end is the exclusive end of the block (index of next top-level key or
 * lines.length), and children is the list of {i, text} for indented child lines.
 */
function findPhotoBlock(fmLines) {
	let start = -1;
	for (let i = 0; i < fmLines.length; i++) {
		if (/^photo:\s*$/.test(fmLines[i])) {
			start = i;
			break;
		}
	}
	if (start === -1) return null;
	const children = [];
	let end = fmLines.length;
	for (let j = start + 1; j < fmLines.length; j++) {
		const line = fmLines[j];
		if (line === "" || /^\s/.test(line)) {
			if (/^\s/.test(line)) children.push({ i: j, text: line });
			continue;
		}
		end = j;
		break;
	}
	return { start, end, children };
}

const isHideTrue = (t) => /^\s*hide:\s*true\s*(#.*)?$/.test(t);
const isHideList = (t) => /^\s*hide:\s*["']?list["']?\s*(#.*)?$/.test(t);
const isListFalse = (t) => /^\s*list:\s*false\s*(#.*)?$/.test(t);
const isHideOrList = (t) => /^\s*(hide|list):\s/.test(t);

function migrate(file) {
	const raw = readFileSync(file, "utf8");
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
	if (!m) return null;
	const fmRaw = m[1];
	const nl = fmRaw.includes("\r\n") ? "\r\n" : "\n";
	const fmLines = fmRaw.split(nl);

	const block = findPhotoBlock(fmLines);
	if (!block) return null;
	const { start, end, children } = block;

	const hideTrue = children.some((c) => isHideTrue(c.text));
	const hideList = children.some((c) => isHideList(c.text));
	const listFalse = children.some((c) => isListFalse(c.text));

	if (!hideTrue && !hideList && !listFalse) return null;

	// Indices of hide/list child lines to drop.
	const dropIdx = new Set(children.filter((c) => isHideOrList(c.text)).map((c) => c.i));

	let newLines;
	let summary;
	if (hideTrue) {
		// photo block → og; drop hide/list children.
		newLines = fmLines.map((line, i) => {
			if (i === start) return line.replace(/^photo:/, "og:");
			if (dropIdx.has(i)) return null;
			return line;
		}).filter((l) => l !== null);
		summary = "photo+hide:true → og (OG-only)";
	} else {
		// keep photo, drop hide/list children, insert top-level `thumb: false`
		// immediately after the photo block (before the line at `end`, or at
		// the end of frontmatter if photo was the last key).
		const out = [];
		for (let i = 0; i < fmLines.length; i++) {
			if (i === end) out.push("thumb: false");
			if (dropIdx.has(i)) continue;
			out.push(fmLines[i]);
		}
		if (end >= fmLines.length) out.push("thumb: false");
		newLines = out;
		summary = hideList ? "hide:list → thumb:false" : "list:false → thumb:false";
	}

	const newFm = newLines.join(nl);
	const newRaw = raw.replace(m[0], `---${nl}${newFm}${nl}---${nl}`);
	return { file, summary, oldRaw: raw, newRaw };
}

const files = walk(ROOT);
const changes = [];
for (const f of files) {
	const r = migrate(f);
	if (r) changes.push(r);
}

if (changes.length === 0) {
	console.log("No photo hide/list blocks found; nothing to do.");
} else {
	for (const c of changes) {
		console.log(`${WRITE ? "wrote" : "DRY"}  ${c.file}  (${c.summary})`);
		if (WRITE) writeFileSync(c.file, c.newRaw);
	}
	console.log(`\n${changes.length} file(s) ${WRITE ? "updated" : "would be updated"}.`);
}
