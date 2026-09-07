export const taxonomyData = {
	locales: ["cmn", "en", "juai", "mnc", "ja", "za"],
	categories: {
		笔记: {
			t: {},
			slug: "note",
		},
		测试: {
			t: {},
		},
		动态列表: {
			t: {},
			slug: "list",
		},
		读书笔记: {
			t: {},
			slug: "book",
		},
		光学: {
			t: {},
			slug: "optics",
		},
		惊鸿一瞥: {
			t: {},
		},
		六不答對: {
			t: {},
		},
		满语: {
			t: {},
			slug: "manchu",
		},
		年终总结: {
			t: {},
			slug: "wrapped",
		},
		日常: {
			t: {},
			slug: "daily",
		},
		日语: {
			t: {},
		},
		题解: {
			t: {},
			slug: "solution",
		},
		题隙碎笔: {
			t: {},
			slug: "gaokao",
		},
		咬文嚼字: {
			t: {},
			slug: "word",
		},
		页面仔的自我修养: {
			t: {},
			slug: "frontend",
		},
		译文: {
			t: {},
			slug: "translation",
		},
		周报: {
			t: {},
		},
		BUAA: {
			t: {},
		},
		Changelog: {
			t: {},
			slug: "changelog",
		},
		Python: {
			t: {},
			slug: "python",
		},
		Selected: {
			t: {},
			slug: "selected",
		},
		Tonsky: {
			t: {},
			slug: "tonsky",
		},
		Typst: {
			t: {},
			slug: "typst",
		},
		Writeup: {
			t: {},
			slug: "writeup",
		},
	},
	tags: {
		八方旅人: {
			t: {
				en: "Octopath Traveler",
				ja: "オクトパストラベラー",
			},
		},
		笔记: {
			t: {},
		},
		编程: {
			t: {},
		},
		编码理论: {
			t: {},
		},
		材料力学: {
			t: {},
		},
		仓颉编程语言: {
			t: {},
		},
		传感器: {
			t: {},
		},
		串口: {
			t: {},
		},
		大气辐射传输: {
			t: {},
		},
		德语: {
			t: {
				en: "German",
			},
		},
		多邻国: {
			t: {},
		},
		番组: {
			t: {},
		},
		翻译: {
			t: {},
		},
		仿真: {
			t: {},
		},
		歌词: {
			t: {},
		},
		公差: {
			t: {},
		},
		光线追踪: {
			t: {},
		},
		光学: {
			t: {},
		},
		韩语: {
			t: {},
		},
		汉语: {
			t: {},
		},
		鸿蒙: {
			t: {
				en: "HarmonyOS",
			},
		},
		看展: {
			t: {},
		},
		考试: {
			t: {},
		},
		控制理论: {
			t: {},
		},
		蓝桥杯: {
			t: {},
		},
		力扣每日挑战: {
			t: {},
		},
		逆向: {
			t: {},
		},
		排版: {
			t: {},
		},
		前端: {
			t: {},
		},
		嵌入式: {
			t: {},
		},
		日语: {
			t: {},
		},
		maimai: {
			t: {
				cmn: "舞萌",
				en: "Maimai",
			},
			slug: "maimai",
		},
		taiko: {
			t: {
				cmn: "太鼓达人",
				en: "Taiko no Tatsujin",
			},
			slug: "taiko",
		},
		e5: {
			t: {
				cmn: "E舞成名",
			}
		},
		数字图像处理: {
			t: {
				en: "Digital Image Processing",
			},
		},
		数学: {
			t: {},
		},
		四元数: {
			t: {},
		},
		碎碎念: {
			t: {},
		},
		微信: {
			t: {
				en: "WeChat",
			},
		},
		误差理论: {
			t: {},
		},
		小程序: {
			t: {},
		},
		信创: {
			t: {},
		},
		揚州話: {
			t: {
				en: "Yangzhou dialect",
				juai: "揚州話",
			},
		},
		英语: {
			t: {},
		},
		越南語: {
			t: {
				juai: "越南語",
				en: "Vietnamese",
				ja: "ベトナム語",
			},
		},
		制导与控制基础: {
			t: {},
		},
		字体: {
			t: {},
		},
		AST: {
			t: {},
		},
		Astro: {
			t: {},
		},
		AutoCAD: {
			t: {},
		},
		"BUAA-OS": {
			t: {},
		},
		Chrome: {
			t: {},
		},
		Crypto: {
			t: {},
		},
		CSS: {
			t: {},
		},
		CTF: {
			t: {},
		},
		ECharts: {
			t: {},
		},
		Flutter: {
			t: {},
		},
		GitHub: {
			t: {},
		},
		JavaScript: {
			t: {},
		},
		LeetCode: {
			t: {},
		},
		meme: {
			t: {},
		},
		MFC: {
			t: {},
		},
		MODTRAN: {
			t: {},
		},
		MoonBit: {
			t: {},
		},
		PBRT: {
			t: {},
		},
		"pdf.js": {
			t: {},
		},
		PowerShell: {
			t: {},
		},
		Python: {
			t: {},
		},
		RemNote: {
			t: {},
		},
		Rust: {
			t: {},
		},
		SSTI: {
			t: {},
		},
		STWP: {
			t: {},
		},
		Svelte: {
			t: {},
		},
		Syncthing: {
			t: {},
		},
		Tauri: {
			t: {},
		},
		Telegram: {
			t: {},
		},
		TypeScript: {
			t: {},
		},
		Unicode: {
			t: {},
		},
		"Visual Studio": {
			t: {},
		},
		"VS Code": {
			t: {},
		},
	},
} as const;

export type Category = keyof typeof taxonomyData.categories;
export type Tag = keyof typeof taxonomyData.tags;

type TaxonomyEntry = {
	readonly t: Readonly<Record<string, string>>;
	readonly slug?: string;
};

type TaxonomyMap = Readonly<Record<string, TaxonomyEntry>>;

const categoryData = taxonomyData.categories as TaxonomyMap;
const tagData = taxonomyData.tags as TaxonomyMap;

const languageAliases: Readonly<Record<string, string>> = {
	zh: "cmn",
	"zh-Hans": "cmn",
	"zh-Hant": "cmn",
};

function getTaxonomyLabel(data: TaxonomyMap, name: string, lang: string) {
	const translations = data[name]?.t;
	return (
		translations?.[lang] ??
		translations?.[languageAliases[lang]] ??
		translations?.cmn ??
		name
	);
}

export const CAT_MAP = Object.fromEntries(
	Object.entries(categoryData).flatMap(([name, entry]) =>
		entry.slug ? [[name, entry.slug]] : [],
	),
) as Record<string, string>;

export function getCatSlug(cat: string) {
	return categoryData[cat]?.slug ?? cat;
}

export function getTagSlug(tag: string) {
	return tagData[tag]?.slug ?? tag;
}

export function getCatLabel(cat: string, lang = "cmn") {
	return getTaxonomyLabel(categoryData, cat, lang);
}

export function getTagLabel(tag: string, lang = "cmn") {
	return getTaxonomyLabel(tagData, tag, lang);
}

export default taxonomyData;
