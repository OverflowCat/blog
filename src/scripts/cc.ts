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
];


export default function getCC() {
    // cc ||= OpenCC.Converter({ from: "cn", to: "twp" }) as (s: string) => string;
    OpenCC.Locale.to.twp[1] = OpenCC.Locale.to.twp[1].replace('擴展 擴充套件', '擴展 擴充');
    cc ||= OpenCC.ConverterFactory(
        OpenCC.Locale.from.cn,                   // 中国大陆 => OpenCC 标准
        OpenCC.Locale.to.twp // OpenCC 标准 => 台湾+自订
    );
    return cc;
}
