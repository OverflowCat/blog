import * as OpenCC from "opencc-js";

let cc;

export default function getCC() {
    cc ||= OpenCC.Converter({ from: "cn", to: "twp" }) as (s: string) => string;
    return cc;
}
