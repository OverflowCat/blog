function rdmCommonHan() {
    const min = 0x4E00;
    const max = 0x9FFF;
    const codePoint = Math.floor(Math.random() * (max - min + 1)) + min;
    return String.fromCodePoint(codePoint);
}

function rdmHan() {
    // 定义多个汉字区块
    const blocks = [
        [0x4E00, 0x9FFF],   // CJK Unified Ideographs
        [0x3400, 0x4DBF],   // CJK Unified Ideographs Extension A
        [0x20000, 0x2A6DF], // CJK Unified Ideographs Extension B
        [0x2A700, 0x2B73F], // CJK Unified Ideographs Extension C
        [0x2B740, 0x2B81F], // CJK Unified Ideographs Extension D
        [0x2B820, 0x2CEAF], // CJK Unified Ideographs Extension E
        [0x2CEB0, 0x2EBEF], // CJK Unified Ideographs Extension F
        [0x30000, 0x3134F], // CJK Unified Ideographs Extension G
        [0x31350, 0x323AF], // CJK Unified Ideographs Extension H
        [0xF900, 0xFAFF],   // CJK Compatibility Ideographs
        [0x2F800, 0x2FA1F]  // CJK Compatibility Ideographs Supplement
    ];

    // 随机选择一个区块
    const block = blocks[Math.floor(Math.random() * blocks.length)];
    // 在选定的区块内随机生成一个码点
    const codePoint = Math.floor(Math.random() * (block[1] - block[0] + 1)) + block[0];
    // 将码点转换为字符串
    return String.fromCodePoint(codePoint);
}

export function hanUuid(length = 4, useCommon = true) {
    const generator = useCommon ? rdmCommonHan : rdmHan;
    let uuid = "";
    for (let i = 0; i < length; i++) {
        uuid += generator();
    }
    return uuid;
}

function rdmHangul() {
    const choseongStart = 0x1100;
    const choseongEnd = 0x1112;

    const jungseongStart = 0x1161;
    const jungseongEnd = 0x1175;

    // 包括了没有尾声的情况，即0x11A7
    const jongseongStart = 0x11A7;
    const jongseongEnd = 0x11C2;

    const choseong = Math.floor(Math.random() * (choseongEnd - choseongStart + 1)) + choseongStart;
    const jungseong = Math.floor(Math.random() * (jungseongEnd - jungseongStart + 1)) + jungseongStart;
    const jongseong = Math.floor(Math.random() * (jongseongEnd - jongseongStart + 1)) + jongseongStart;

    const codepoint = 0xAC00 + ((choseong - 0x1100) * 21 + (jungseong - 0x1161)) * 28 + (jongseong - 0x11A7);

    return String.fromCodePoint(codepoint);
}

export function hangulUuid(length = 4) {
    let uuid = "";
    for (let i = 0; i < length; i++) {
        uuid += rdmHangul();
    }
    return uuid;
}
