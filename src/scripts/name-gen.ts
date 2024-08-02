import { pick } from "./serendipity";

const el1 = [
  "废墟",
  "深海",
  "反应堆",
  "学园",
  "腐烂",
  "东京",
  "三维",
  "东方",
  "深刻",
  "四次元",
  "流星",
  "闪光",
  "内存",
  "南极",
  "消极",
  "幽浮",
  "网路",
  "暗狱",
  "离子态",
  "液态",
  "前端",
  "黑色",
  "抱抱",
  "社会",
  "原味",
  "毛茸茸",
  "香香",
  "逻辑门",
  "霹雳",
  "午夜",
  "美工刀",
  "爆浆",
  "机关枪",
  "无响应",
  "手术台",
  "东欧",
  "北欧",
  "世界",
  "麻风病",
  "虚拟",
  "可穿戴",
  "速冻",
  "智能",
  "2000",
  "甜味",
  "华丽",
  "玛利亚",
  "无",
  "梦之",
  "星系",
  "断桥",
  "无尽",
  "星尘",
  "蔷薇",
  "无政府",
  "酷酷",
  "西伯利亚",
  "人造",
  "法外",
  "女子",
  "微型",
  "男子",
  "超",
  "毁灭",
  "大型",
  "绝望",
  "阴间",
  "死亡",
  "坟场",
  "可执行",
  "高科技",
  "奇妙",
  "地雷",
  "魔法",
  "极限",
  "无聊",
  "满洲",
  "奉天",
];
const el2 = [
  "小丑",
  "仿生",
  "纳米",
  "原子",
  "丧",
  "电子",
  "十字架",
  "咩咩",
  "赛博",
  "野猪",
  "外星",
  "窒息",
  "变态",
  "触手",
  "小众",
  "可爱",
  "悲情",
  "飞行",
  "绿色",
  "电动",
  "铁锈",
  "电音",
  "蠕动",
  "酸甜",
  "虚构",
  "乱码",
  "碳水",
  "内脏",
  "含糖",
  "脑浆",
  "血管",
  "逃课",
  "绷带",
  "不合格",
  "光滑",
  "酸性",
  "碱性",
  "404",
  "变身",
  "反常",
  "碳基",
  "矫情",
  "病娇",
  "进化",
  "潮湿",
  "砂糖",
  "阴暗",
  "变异",
  "复合盐",
  "伏特加",
  "抑郁",
  "睡觉",
  "自闭",
  "暴躁",
  "沉默",
  "废物",
  "失败",
  "幻想型",
  "社恐",
  "粘液",
  "苦涩",
  "浓厚",
  "快乐",
  "强制",
  "中二病",
  "恶魔",
  "emo",
  "激光",
  "高科技",
  "发射",
  "限量版",
  "迷因",
  "堕落",
  "放射性",
];
const el3 = [
  "天使",
  "精灵",
  "女孩",
  "男孩",
  "宝贝",
  "宝宝",
  "旅人",
  "小妈咪",
  "菇",
  "虫",
  "公主",
  "少女",
  "少年",
  "1号机",
  "子",
  "恐龙",
  "食人鱼",
  "小飞船",
  "舞女",
  "酱",
  "史莱姆",
  "废料",
  "生物",
  "物质",
  "奶茶",
  "搅拌机",
  "液",
  "火锅",
  "祭司",
  "体",
  "头子",
  "实验品",
  "试验体",
  "小猫咪",
  "猫",
  "样本",
  "颗粒",
  "血块",
  "汽水",
  "蛙",
  "软体",
  "机器人",
  "咸鱼",
  "圣母",
  "胶囊",
  "乙女",
  "主义者",
  "屑",
  "垢",
  "污渍",
  "废人",
  "毛血旺",
  "怪人",
  "肉",
  "河豚",
  "豚",
  "藻类",
  "唾沫",
  "咒语",
  "建筑",
  "球",
  "小狗",
  "碳",
  "JK",
  "DK",
  "元素",
  "巴图鲁",
  "大手子",
  "木桶饭",
  "男娘",
  "猫头鹰",
  "火焰鸟",
  "团子",
  "鳐鱼",
  "精",
];

export default function nameGen() {
  return pick(el1) + pick(el2) + pick(el3);
}
