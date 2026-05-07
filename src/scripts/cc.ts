import * as OpenCC from "opencc-js";

let cc;

/**
 * If `wikitext` is `True`, inline conversion rules such as `-{foo...bar}-` are parsed.
 * `rules` should be line-seperated in MediaWiki syntax without -{ or }- tags, like
 * `zh-hans:鹿; zh-hant:馬`.
 */
// const RULES = `zh-hans:扩展字; zh-hant:擴充字`;

const customDict = [
    ['扩展字', '擴充字'],
    ['扩展', '擴充'],
];

export default function getCC() {
    cc ||= OpenCC.ConverterFactory(
        OpenCC.Locale.from.cn,
        OpenCC.Locale.to.twp.concat([customDict])
    );
    return cc;
}
