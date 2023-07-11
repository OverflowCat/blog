---
title: 如何在 AutoCAD 中标注公差
description: 在 AutoCAD 2014 中，有两种标注公差的方式。
date: 2022-11-24 17:53:08
tags:
- AutoCAD
- 公差
categories: 制图
layout: "@/layouts/Default.astro"
noscript: true
---

在 AutoCAD 2014 中，有两种标注**公差**的方式。

## 通过「特性」窗格

在已有的标注上右键，打开「特性」窗格。

![右键菜单](http://telegra.ph/file/540a9fe796d6a51b73282.png)

![公差](http://telegra.ph/file/d5ae69a9615a1aa6437ff.png)

需要将「显示公差」设为「极限偏差」。注意选择精度。

「公差消去前导零」为「是」会省略小数点前面的 0。

![开启公差消去前导零](http://telegra.ph/file/792b20aa1b988fe7323a6.png)

「公差消去后续零」为「否」会填充 0。

![关闭公差消去后续零](http://telegra.ph/file/a646234170dfcf2bd39fd.png)

## 通过「堆叠」

输入 `符号 值 上偏差/下偏差`，然后选中 `上偏差/下偏差`。

![](http://telegra.ph/file/a5e6105150a35e110e1df.png)

在选中的文本中有 `/` 时右键菜单会多出一个「堆叠」的选项。

![](http://telegra.ph/file/d844e454c8b91b99c2425.png)

![](http://telegra.ph/file/f1eb111b161668c71d0f3.png)

或者，也可以点选 `TEXTEDIT` 工具栏中的图标。

![图标](http://telegra.ph/file/b67a8ae0728365868acb6.png)

再次右键堆叠后的文字，打开「堆叠特性」。

![堆叠特性](http://telegra.ph/file/c6448eb051d12a373b8fa.png)

「样式」选择「公差」以消除分数线。

![堆叠特性](http://telegra.ph/file/69c1343f4bc77492dc2c8.png)

结果如下。

![](http://telegra.ph/file/b763f36b74cbf9bb64f63.png)

![](http://telegra.ph/file/2e5f91739f4a585055e57.png)

以上。🅰️
