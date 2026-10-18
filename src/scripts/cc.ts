import { ConverterFactory } from "opencc-js/core";
import fromCN from "opencc-js/from/cn";
import toTWP from "opencc-js/to/twp";

let cc: ReturnType<typeof ConverterFactory>;

/**
 * If `wikitext` is `True`, inline conversion rules such as `-{foo...bar}-` are parsed.
 * `rules` should be line-seperated in MediaWiki syntax without -{ or }- tags, like
 * `zh-hans:鹿; zh-hant:馬`.
 */
// const RULES = `zh-hans:扩展字; zh-hant:擴充字`;

const customDict: [string, string][] = [
	["扩展字", "擴充字"],
	["扩展", "擴充"],
];

export default function getCC() {
	cc ||= ConverterFactory(fromCN, toTWP.concat([customDict]));
	return cc;
}

export type HantReplacements = [string, string][];

// CN → TWP dictionary keys contain Han characters, with occasional Latin
// letters/hyphens (B超, SQL注入, 伯克希尔-哈撒韦). Keep these together while
// excluding HTML syntax, SVG coordinates and other ASCII-only content.
// The longest ASCII prefix in these dictionaries is SQL. Bound the prefix so
// scanning a long ASCII-only token cannot cause quadratic backtracking.
const conversionRuns = /[A-Z]{0,3}[^\x00-\x7f][A-Za-z\-\u0080-\u{10ffff}]*/gu;
const hasHan = /\p{Script=Han}/u;

export function prepareHant(value: string, replacements: Map<string, string>) {
	if (!hasHan.test(value)) return;
	for (const [run] of value.matchAll(conversionRuns)) {
		if (hasHan.test(run) && !replacements.has(run)) {
			replacements.set(run, getCC()(run));
		}
	}
}

export function convertToHant(html: string, prepared: HantReplacements = []) {
	const replacements = new Map(prepared);
	const converted = hasHan.test(html)
		? html.replace(conversionRuns, (run) => {
				if (!hasHan.test(run)) return run;
				let value = replacements.get(run);
				if (value === undefined) {
					// MDX components and Typst can produce text after rehype has run.
					value = getCC()(run);
					replacements.set(run, value);
				}
				return value;
			})
		: html;
	return converted.replaceAll(' lang="zh-Hans"', ' lang="zh-Hant"');
}
