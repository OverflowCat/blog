const data = {
  "comments": {
    "title": {
      "en": "Comments",
      "zh": "评论",
      "juai": "Píngluèn",
      "mnc": "ᠯᡝᠣᠯᡝᠨ",
      "ja": "コメント",
    },
    "nickname": {
      "en": "Nickname",
      "zh": "昵称",
      "juai": "Lĩtsen",
      "mnc": "ᡤᡝᠪᡠ",
      "ja": "ニックネーム",
    },
    "email": {
      "en": "Email",
      "zh": "邮箱",
      "juai": "邮箱",
      "mnc": "Email",
      "ja": "メール",
    },
    "email_placeholder": {
      "en": "Will be publicly displayed",
      "zh": "公开显示",
      "juai": "公开显示",
      "mnc": "X",
      "ja": "公開表示",
    },
    "homepage_url": {
      "en": "Homepage URL",
      "zh": "主页链接",
      "juai": "Hôngpềji liàenjic",
      "mnc": "Homepage ᠪᡝ ᡥᠣᠯᠪᠣᠪᡠᠮᠪᡳ",
      "ja": "ホームページURL",
    },
    "homepage_placeholder": {
      "en": "Your personal homepage, blog, or social media URL",
      "zh": "你的个人主页、博客、社交媒体等的 URL",
      "juai": "你的个人主页、博客、社交媒体等的 URL",
      "mnc": "Your personal homepage, blog, or social media URL",
      "ja": "個人ホームページ、ブログ、SNSなどのURL",
    },
    "message": {
      "en": "Message",
      "zh": "留言",
      "juai": "Luìyóng",
      "mnc": "ᠪᠠᡴᡨᠠᠮᠪᡠᠨ",
      "ja": "メッセージ",
    },
    "format_hint": {
      "en": "(You can use Markdown and any HTML)",
      "zh": "（可以使用 Markdown 和任意 HTML）",
      "juai": "（可以yồng Markdown gen 任意 HTML）",
      "mnc": "(ᠵᠠᡳ ᠵᠠᡳ Markdown᠈ HTML ᠪᠠᡳᡨᠠᠯᠠᠪᡠᠴᡳ ᠣᠮᠪᡳ)",
      "ja": "（MarkdownとHTMLが使えます）",
    },
    "submit": {
      "en": "Submit",
      "zh": "发送",
      "juai": "发出去",
      "mnc": "ᡠᠩᡤᡳᠮᠪᡳ",
      "ja": "送信",
    },
    "write_comment": {
      "en": "Write a Comment",
      "zh": "写评论",
      "juai": "写评论",
      "mnc": "Write a Comment",
      "ja": "コメントを書く",
    },
    "cancel": {
      "en": "Cancel",
      "zh": "取消",
      "juai": "取消",
      "mnc": "ᠠᡵᡤᡳᠶᠠᠮᠪᡳ", // argiyambi
      "ja": "キャンセル",
    },
    "reply": {
      "en": "Reply",
      "zh": "回复",
      "juai": "回复",
      "mnc": "ᠯᡝᠣᠯᡝᠨ", // TODO
      "ja": "返信",
    },
    "author_name": {
      "en": "Cat",
      "zh": "猫猫",
      "juai": "猫猫",
      "mnc": "ᡴᡝᠰᡳᡴᡝ",
      "ja": "猫猫",
    },
    "randomly_generated": {
      "en": "Randomly generated",
      "zh": "随机生成的",
      "juai": "随机生成的",
      "mnc": "",
      "ja": "ランダム生成",
    },
    "email_warning_title": {
      "en": "Notice",
      "zh": "注意",
      "juai": "注意",
      "mnc": "ᠣᠯᡥᠣᡧᠣᡵᠠᡴᡡᠴᡳ ᠣᠵᠣᡵᠠᡴᡡ",
      "ja": "注意",
    },
    "email_warning_subtitle": {
      "en": "Please leave empty, will be treated as spam!",
      "zh": "请勿填写，会被当作 spam！",
      "juai": "请勿填写，会被当作 spam！",
      "mnc": "ᡠᠮᡝ E-mail ᠨᠣᠩᡤᡳᠮᡝ ᠠᡵᠠᡵᠠᡴᡡ!",
      "ja": "記入しないでください。スパムとして扱われます！",
    },
    "moderation_notice": {
      "en": "Comments will be displayed after moderation. You can view them in the",
      "zh": "评论将在审核后显示，阁下可以在本博客的 Github 仓库的",
      "juai": "评论将在审核后显示，阁下可以在本博客的 Github 仓库的",
      "mnc": "ᠯᡝᠣᠯᡝᠨ ᡴᡳᠮᠴᡳᡵᡝ ᠪᡝ ᠪᠠᡳᠪᡠᠮᠪᡳ᠉ ᡤᡳᡨ ᡥᠠᠪ ‍ᡳ",
      "ja": "コメントは承認後に表示されます。",
    },
    "moderation_notice_link": {
      "en": "Pull Request list",
      "zh": "拉取请求列表",
      "juai": "拉取请求列表",
      "mnc": "Pull Request ‍ᡳ ᡤᡝᡨᡠᡴᡝᠨ ᠠᡶᠠᡥᠠ",
      "ja": "Pull Requestリスト",
    },
    "moderation_notice_end": {
      "en": "of this blog's Github repository. Will redirect automatically after successful submission.",
      "zh": "中查看。提交成功后会自动跳转。",
      "juai": "中查看。提交成功后会自动跳转。",
      "mnc": "ᡩᡝ ᠪᠠᡳᠴᠠᠨᠠᠮᠪᡳ᠉", // TODO
      "ja": "で確認できます。送信成功後に自動リダイレクトします。",
    },
    "placeholders": {
      "en": [
        "Leave your thoughts here...",
        "Share your ideas with the world...",
        "What do you think?",
        "Leave a message for the host~"
      ],
      "zh": [
        "请洒潘江，各倾陆海云尔…",
        "矮纸斜行闲作草，晴窗细乳戏分茶…",
        "此意在人间，试听徽外三两弦…",
        "给主人留下些什么吧～"
      ],
      "juai": [
        "请洒潘江，各倾陆海云尔…",
        "矮纸斜行闲作草，晴窗细乳戏分茶…",
        "此意在人间，试听徽外三两弦…",
        "给主人留下些什么吧～"
      ],
      "mnc": [
        "ᡶᡳ ᠨᡳᡴᡝᠪᡠᠴᡳᠨᠠ!", // 执笔/挥毫吧
      ],
      "ja": [
        "ここに感想をどうぞ…",
        "あなたの思いを世界にシェア…",
        "どう思いますか？",
        "ホストにメッセージを残してね～"
      ],
    },
  }
}

// Helper type to check if an object is a language container.
type IsLanguageContainer<T> =
  T extends Record<string, string | string[]> ? true : false;

type PathValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * Generates all paths of an object, stopping the recursion
 * one level before the path points to the language container object.
 */
type I18nPaths<T> = T extends Record<string, unknown> ? {
  // Iterate over all keys
  [K in keyof T & (string | number)]:
  // Check if the current value is the final language container
  IsLanguageContainer<T[K]> extends true
  ? // Base case: If it is the language container, stop and return the current key
  `${K}`
  : // Recursive case: If it's another nested object, continue the path
  `${K}.${I18nPaths<T[K]>}`
  // Retrieve the union of all generated strings
}[keyof T & (string | number)] : never;

type TranslationValue<K extends I18nPaths<typeof data>> =
  PathValue<typeof data, K> extends Record<string, infer V> ? V : never;

export function _t(lang: string) {
  // The key now stops one level early, at the translation object
  return <K extends I18nPaths<typeof data>>(key: K): TranslationValue<K> => {
    const levels = key.split(".");
    let result: unknown = data;

    // Traverse the object up to the language container
    for (const level of levels) {
      if (typeof result === "object" && result !== null && level in result) {
        result = (result as Record<string, unknown>)[level];
      } else {
        return key as TranslationValue<K>; // Return the key itself if not found
      }
    }

    // 'result' is now the language container (e.g., { en: 'Home', fr: 'Accueil' })
    if (typeof result === "object" && result !== null && lang in result) {
      return (result as Record<string, TranslationValue<K>>)[lang];
    }

    // Fallback: If the specific language is not found, return the key
    return key as TranslationValue<K>;
  }
}
