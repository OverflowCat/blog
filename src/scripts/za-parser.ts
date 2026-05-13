export type Etym = "old" | "new" | false | "phonetic-only";

export type Zi = {
  char: string;
  bor: Etym;
};

export type Word =
  | string
  | {
      zi: Zi[];
      bor: Etym;
      upper?: true;
    };

export type Mark = "^" | "&" | "*" | ".";

const MARK_TO_BOR: Record<Exclude<Mark, "^">, Etym> = {
  "&": "old",
  "*": "new",
  ".": "phonetic-only",
};

function isMark(ch: string): ch is Mark {
  return ch === "^" || ch === "&" || ch === "*" || ch === ".";
}

function isWhitespace(ch: string): boolean {
  return /\s/u.test(ch);
}

function isPunctuation(ch: string): boolean {
  return /[，。！？“”()\-]/u.test(ch);
}

export function parseSawndip(input: string): Word[] {
  const res: Word[] = [];
  const chars = Array.from(input);

  let i = 0;

  while (i < chars.length) {
    // 只跳過空白，不跳過標點
    while (i < chars.length && isWhitespace(chars[i])) i++;
    if (i >= chars.length) break;

    // 標點作爲 Word string 保留
    if (isPunctuation(chars[i])) {
      res.push(chars[i]);
      i++;
      continue;
    }

    let upperWhole = false;
    let wholeBor: Etym | undefined;
    const pendingZiMarks: Etym[] = [];

    while (i < chars.length && isMark(chars[i])) {
      const mark = chars[i];

      if (mark === "^") {
        upperWhole = true;
        i += chars[i + 1] === "^" ? 2 : 1;
        continue;
      }

      // @ts-ignore
      const bor = MARK_TO_BOR[mark];

      if (chars[i + 1] === mark) {
        wholeBor = bor;
        i += 2;
      } else {
        pendingZiMarks.push(bor);
        i += 1;
      }
    }

    let token = "";

    while (
      i < chars.length &&
      !isWhitespace(chars[i]) &&
      !isPunctuation(chars[i]) &&
      !isMark(chars[i])
    ) {
      token += chars[i];
      i++;
    }

    if (!token) {
      i++;
      continue;
    }

    const ziChars = Array.from(token);

    const zi: Zi[] = ziChars.map((char, index) => ({
      char,
      bor: pendingZiMarks[index] ?? wholeBor ?? false,
    }));

    const word: Exclude<Word, string> = {
      zi,
      bor: wholeBor ?? zi[0]?.bor ?? false,
    };

    if (upperWhole) {
      word.upper = true;
    }

    res.push(word);
  }

  return res;
}
