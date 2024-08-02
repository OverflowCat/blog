#set text(lang: "zh", cjk-latin-spacing: auto, font: "Noto Serif CJK SC")
#set page(width: 42em, height: auto, margin: (top: 1em, bottom: .5em, rest: 0em))
#show heading.where(level: 1): set text(font: "Noto Sans CJK SC", size: 1.2em)
#show heading.where(level: 2): set text(size: 1.1em)
#show "。": "．"
#show heading.where(level: 3): set text(font: "Noto Sans CJK SC", size: 1.05em)
#import "@preview/unify:0.5.0": num, qty
#import "./counter.typ": headingNumbering
#set heading(numbering: headingNumbering)

== 绪论

局部放电普遍存在于变压器、电力电缆、开关柜、等电力设备的运行过程中，设备的局部放电会伴随各种电、光、声等复杂的现象。而电气设备绝缘故障早期阶段通常表现为局部放电，对局部放电进行实时在线检测，尽早识别并能迅速准确找到局部放电发生位置是保障电力设备乃至电网安全运行所迫切需要解决的问题。

#let height = 8cm
#figure(caption: "电力电缆绝缘故障引发火灾",
  stack(
    image("./fire-1.png", height: height),
    image("./fire-2.jpg", height: height),
    dir: ltr,
    spacing: .2cm
  )
)

按照实现的技术手段和检测方法的基本原理进行分类，局部放电的检测方法分为直接法和间接法。直接法的理论基础是经典电路理论，如脉冲电流法，间接法就是基于以上物理现象逐渐衍生出的多种局部放电检测方法，如化学法、光学法、电磁法、声波法、热扫描法和测温法等，常用的局部放电检测方法特性如@comparison 所示。

#import "@preview/tablem:0.1.0": tablem
#figure(
  caption: "局部放电检测方法特性比较",
  tablem[
  | *检测方法*
 | *优点* | *缺点* | *可达精度* | *实际应用* |
|---|---|---|---|---|
| 脉冲电流检测法 | 方法简单，灵敏度高 | 不能在线检测 | 5 pC | 早期应用较多 |
| 超高频法 | 灵敏度高，在线检测 | 造价高 | $0.5"~  "#qty(0.8, "pC")$ | 应用多 |
| 超声波 | 不受电磁干扰 | 信号衰减大，距离有限 | $<#qty(2, "pC")$ | 应用多 |
| 化学法 | 不受电磁干扰 | 灵敏度差，不能长时间监测 | 差 | 极少应用 |
| 光检测法 | 不受电磁干扰 | 灵敏度差，光学传感器受温度影响较大，需多个传感器 | 差 | 极少应用 |
]
)<comparison>

脉冲电流法通过检测局部放电在接地线上产生的电流来检测局部放电，能及时发现电力设备的缺陷；可以评估缺陷损坏程度；校准方法比较有效，能对局部放电定量分析。根据脉冲电流法测局部放电，可以得到放电量与电压的关系。但是其中会存在误差需要修正，我们选择这个题目分析误差源并且得到更精准的测量方案。

== 测量方案
