const data = {
  "comments": {
    "title": {
      "en": "Comments",
      "zh": "评论",
      "juai": "Píngluèn",
    },
    "nickname": {
      "en": "Nickname",
      "zh": "昵称",
      "juai": "Lĩtsen",
    },
    "homepage_url": {
      "en": "Homepage URL",
      "zh": "主页链接",
      "juai": "Hôngpềji liàenjic",
    },
    "placeholder": {
      "en": "(You can use Markdown and any HTML)",
      "zh": "（可以使用 Markdown 和任意 HTML）",
      "juai": "（可以yồng Markdown gen 任意 HTML）",
    }
  }

}

// Helper type to check if an object's values are all strings (the language codes)
type IsLanguageContainer<T> =
  T extends Record<string, string> ? true : false;

/**
 * Generates all paths of an object, stopping the recursion
 * one level before the path points to the language container object.
 */
type I18nPaths<T> = T extends Record<string, any> ? {
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

export function _t(lang: string) {
  // The key now stops one level early, at the translation object
  return (key: I18nPaths<typeof data>) => {
    const levels = key.split(".");
    let result: any = data;

    // Traverse the object up to the language container
    for (const level of levels) {
      if (result?.[level]) {
        result = result[level];
      } else {
        return key; // Return the key itself if not found
      }
    }

    // 'result' is now the language container (e.g., { en: 'Home', fr: 'Accueil' })
    if (result?.[lang]) {
      return result[lang] as string;
    }

    // Fallback: If the specific language is not found, return the key
    return key;
  }
}
