import { z } from "astro:content";

const ExternalResourceSchema = z.object({
  url: z.string().url(),
});

const LocalizedTextSchema = z.object({
  lang: z.string(),
  text: z.string(),
});

export const GameSchema = z.object({
  id: z.string().url(),
  type: z.literal('Game'),
  uuid: z.string(),
  url: z.string(),
  api_url: z.string(),
  category: z.literal('game'),
  parent_uuid: z.string().nullable(),
  display_title: z.string(),
  external_resources: z.array(ExternalResourceSchema),
  title: z.string(),
  description: z.string(),
  localized_title: z.array(LocalizedTextSchema),
  localized_description: z.array(LocalizedTextSchema),
  cover_image_url: z.string().url(),
  rating: z.number(),
  rating_count: z.number(),
  brief: z.string(),
  genre: z.array(z.string()),
  developer: z.array(z.string()),
  publisher: z.array(z.string()),
  platform: z.array(z.string()),
  release_type: z.string().nullable(),
  release_date: z.string(),
  official_site: z.string(),
});

export type Game = z.infer<typeof GameSchema>;


/*
{
  "id": "https://neodb.social/movie/1O3OM5a0GELT6BtF7KEtUp",
  "type": "Movie",
  "uuid": "1O3OM5a0GELT6BtF7KEtUp",
  "url": "/movie/1O3OM5a0GELT6BtF7KEtUp",
  "api_url": "/api/movie/1O3OM5a0GELT6BtF7KEtUp",
  "category": "movie",
  "parent_uuid": null,
  "display_title": "抓娃娃",
  "external_resources": [
    {
      "url": "https://movie.douban.com/subject/36653918/"
    },
    {
      "url": "https://www.imdb.com/title/tt32613601/"
    },
    {
      "url": "https://www.themoviedb.org/movie/1299537"
    }
  ],
  "title": "抓娃娃",
  "description": "困苦的爹，辛劳的妈，破烂的院子，破碎的他。西虹市做大做强的路上怎么把老马家落下了？！\n“汤里没油，兜里没子”的马成钢（沈腾 饰）和春兰（马丽 饰），赶驴打工，家徒四壁，而儿子马继业（肖帛辰 饰）则是他们逆天改命的唯一希望。小马很争气，年年好成绩，一点不娇气，意志贼坚毅。但随着小马一天天长大，他却逐渐发现身边的人们都越来越不对劲……",
  "localized_title": [
    {
      "lang": "zh-cn",
      "text": "抓娃娃"
    },
    {
      "lang": "en",
      "text": "Successor"
    }
  ],
  "localized_description": [
    {
      "lang": "zh-cn",
      "text": "困苦的爹，辛劳的妈，破烂的院子，破碎的他。西虹市做大做强的路上怎么把老马家落下了？！\n“汤里没油，兜里没子”的马成钢（沈腾 饰）和春兰（马丽 饰），赶驴打工，家徒四壁，而儿子马继业（肖帛辰 饰）则是他们逆天改命的唯一希望。小马很争气，年年好成绩，一点不娇气，意志贼坚毅。但随着小马一天天长大，他却逐渐发现身边的人们都越来越不对劲……"
    }
  ],
  "cover_image_url": "https://neodb.social/m/item/doubanmovie/2024/07/01/f929217a-3c36-4a6e-8885-64fc07476424.webp",
  "rating": 6.1,
  "rating_count": 69,
  "brief": "困苦的爹，辛劳的妈，破烂的院子，破碎的他。西虹市做大做强的路上怎么把老马家落下了？！\n“汤里没油，兜里没子”的马成钢（沈腾 饰）和春兰（马丽 饰），赶驴打工，家徒四壁，而儿子马继业（肖帛辰 饰）则是他们逆天改命的唯一希望。小马很争气，年年好成绩，一点不娇气，意志贼坚毅。但随着小马一天天长大，他却逐渐发现身边的人们都越来越不对劲……",
  "orig_title": "抓娃娃",
  "other_title": [
    "Successor"
  ],
  "director": [
    "闫非",
    "彭大魔"
  ],
  "playwright": [
    "彭大魔",
    "闫非",
    "林炳宝"
  ],
  "actor": [
    "沈腾",
    "马丽",
    "史彭元",
    "萨日娜",
    "肖帛辰",
    "张子栋",
    "李嘉琦",
    "魏翔",
    "贾冰",
    "于洋",
    "李宗恒",
    "孙贵权",
    "杨文哲",
    "赵凤霞",
    "马文波",
    "陈冰",
    "骆佳",
    "屈爽",
    "刘鉴",
    "丁柳元",
    "王成思",
    "张一鸣",
    "陶亮",
    "芮丹尼"
  ],
  "genre": [
    "喜剧"
  ],
  "language": [
    "汉语普通话"
  ],
  "area": [
    "中国大陆"
  ],
  "year": 2024,
  "site": "",
  "duration": "133分钟",
  "imdb": "tt32613601"
}
*/

export const MovieSchema = z.object({
  id: z.string().url(),
  type: z.literal('Movie'),
  uuid: z.string(),
  url: z.string(),
  api_url: z.string(),
  category: z.literal('movie'),
  parent_uuid: z.string().nullable(),
  display_title: z.string(),
  external_resources: z.array(ExternalResourceSchema),
  title: z.string(),
  description: z.string(),
  localized_title: z.array(LocalizedTextSchema),
  localized_description: z.array(LocalizedTextSchema),
  cover_image_url: z.string().url(),
  rating: z.number(),
  rating_count: z.number(),
  brief: z.string(),
  genre: z.array(z.string()),
  director: z.array(z.string()),
  playwright: z.array(z.string()),
  actor: z.array(z.string()),
  language: z.array(z.string()),
  area: z.array(z.string()),
  year: z.number(),
});
export type Movie = z.infer<typeof MovieSchema>;

export const neoSchema = z.union([GameSchema, MovieSchema]);
export type NeoItem = z.infer<typeof neoSchema>;