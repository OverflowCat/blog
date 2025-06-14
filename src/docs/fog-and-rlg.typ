#set text(lang: "zh", region: "CN")
#show heading: set text(1.3em)
#import "@preview/hyperscript:0.1.0": h as htmlelem
#let h = (s, it) => htmlelem(s.replace(regex(" "), "."), it)
#show math.equation.where(block: false): x => box(
  h("span invert", html.frame(x)),
)
#show math.equation.where(block: true): x => h(
  "div m-block-2 flex flex-row justify-center inline-full",
  h("span invert", html.frame(x)),
)

#let q(content) = {
  h("blockquote text-lg mbs-6! mbe-2! p-2 rounded-md", content)
}

#set math.equation(numbering: "(1)")

== Sagnac 效应和基本表达式

#q[阐述 Sagnac 效应，写出其基本表达式并描述各符号物理意义，由基本表达式推导激光陀螺和光纤陀螺表达式。]

Sagnac 效应是指在一个任意几何形状的闭合光学环路中，从任意一点发出的沿相反方向传播的两束光波，绕行一周返回到该点时，如果闭合光路在其平面内相对惯性空间有旋转，则两束光波的相位将发生变化。

光程差和相位差的基本表达式分别如@optical-path-diff 和@phase-diff 所示。

$ Delta L = (4 Omega A) / c $<optical-path-diff>

$
  italic(Phi)_S &= (4 omega A Omega) / C^2 \
  & = (2 pi L D) / (lambda C) dot.c Omega
$<phase-diff>

其中，

- $A$: 干涉仪光路包围的面积
- $Omega$: 旋转干涉仪的角速度
- $D$: 干涉仪光路的直径
- $L$: 干涉仪光路的周长
- $lambda$: 光波的波长
- $c$: 真空中光速

=== 激光陀螺

时间差 $ Delta t = (4 A Omega) / c^2 $
将此时间差与光程差联系起来：$ Delta L = c Delta t = (4 A Omega) / c $<delta-l>
又 $ f = display(c / lambda)$，对于周长为 P 的激光腔，谐振频率是 $display(c/P)$ 的整数倍。由于光程变化 $Delta L$ 引起的频率变化 $Delta f$ 可近似为 $ |(Delta f) / f| approx |Delta L / P|. $
代入@delta-l，得到 $ |Delta f| approx (f / P) times (4 A Omega / c) $

又 $f approx display(c / lambda)$，有$ |Delta f| approx (c / (lambda P)) times (4 A Omega / c) = (4 A) / (lambda P) Omega. $
这个拍频 $Delta f$ 就是环形激光陀螺中测量的量。记前面的系数 $display((4 A) / (lambda P) = S)$，即为激光陀螺的标度因数。

=== 光纤陀螺

光纤陀螺中光纤绕成直径为 $D$、
纤长为 $L = pi D$、
面积为 $A$ 的环路，有
$ A = pi (D / 2)^2 = (L D) / 4. $<A>

对于包围面积为 $A$ 的环路、以角速率 $Omega$ 旋转的系统，逆、顺光束的往返时间差是 $Delta t = display(frac(4 A Omega, c^2))$，记光的角频率为 $omega$，则两束光经过时间差 $Delta t$ 产生的相位差为
$ Phi_S = omega Delta t = (4 A Omega omega) / (c^2). $<phis>

又 $ c = omega / (2 pi) lambda,quad omega = 2 pi c / lambda. $<omega>

将@A 和@omega 代入@phis，得

$ Phi_S = (8 Omega pi c L D) / (4 lambda c^2) = (2 Omega L D) / (lambda c). $

== 性能指标

#q[列出光学陀螺主要性能指标，并阐述其物理意义。]

/ 零位偏置（零漂）: 位漂移或偏置漂移或零偏稳定性，是陀螺输出围绕其均值的起伏或波动，习惯上用标准偏差或均方根差表示。
/ 随机游走（噪声）: 陀螺输出的随机波动。
/ 标度因数: 标度是陀螺仪输出量与输入角速率的比值，标度因数通常用某一直线的斜率表示，可在整个输入范围内通过改变输入角速率所得的输出量与输入角速率数据，用最小二乘法进行拟合求得。

== 原理和特点

#q[简要描述激光陀螺和光纤陀螺的原理和特点。]

=== 激光陀螺

激光陀螺用高品质因子谐振腔增强 Sagnac 效应，气体激光器产生相干光，通过分束器在环形激光腔内将激光分成顺时针和逆时针两束激光，当系统旋转时，两束光因光程差产生相位差，通过干涉测量相位差即可确定旋转速度。

激光陀螺的特点是精度高、动态范围大、可靠性高。

=== 光纤陀螺

光纤陀螺的结构用多圈光纤实现巨大闭合光路来增强 Sagnac 效应。一束或多束激光通过耦合器进入光纤环，分成两个方向相反的光波。当系统旋转时，通过光电探测器检测两束光干涉后的信号强度变化，从而确定旋转速率。

光纤陀螺的特点是体积小、成本低，对温度等环境因素有更好的适应性。

== 发展历程

#q[进一步查资料，总结#link("https://en.m.wiktionary.org/wiki/%E5%85%A9%E5%85%89%E9%99%80%E8%9E%BA", "「两光」陀螺")发明和发展历程。]

1913 年，法国科学家萨格奈克论证了采用无运动部件的光学系统同样能检测相对惯性空间的旋转。得益于连续激光器的发明，1962年作为第二代陀螺的环形激光陀螺诞生。1963 年美国 #link("https://en.wikipedia.org/wiki/Sperry_Corporation", "Sperry") 公司采用气体激光器建立了激光陀螺装置。1964年，美国 Honeywell 公司得到空军资助开始研制激光陀螺产品，1974 年在飞机上试验成功。1976年美国犹他州立大学 V. Vali 和 R. Shorthill 教授成功进行了第三代陀螺-光纤陀螺的实验演示。90 年代，中高精度的光纤陀螺技术取得了重大突破，出现了谐振式光纤陀螺和布里渊散射式光纤陀螺。
