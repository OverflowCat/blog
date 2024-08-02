#import "./regression.typ": regression, transpose
#import "./cuda.typ": roman
#import "./helper.typ": hr, r0
#import "./vendor/lib.typ": round
#import "@preview/unify:0.5.0": num, qty
#set text(lang: "zh", cjk-latin-spacing: auto, font: "Noto Serif CJK SC")
#set page(width: 42em, height: auto, margin: (top: 1em, rest: 0em))
#show heading.where(level: 1): set text(font: "Noto Sans CJK SC", size: 1.2em)
#show heading.where(level: 2): set text(size: 1.1em)
#show "。": "．"
#show heading.where(level: 3): set text(font: "Noto Sans CJK SC", size: 1.05em)
#show "Romanovsky": "罗曼诺夫斯基准则"
#show "3sigma": [$3 sigma$ 准则]
#import "./counter.typ": headingNumbering
#set heading(numbering: headingNumbering)

#let TITLE = [局部放电检测系统的数据分析和处理]

#show figure.caption: it => [
  #context it.counter.update(n => if n == 1 {n + 1} else { n })
  #it.supplement #context it.counter.display()#h(1em)#it.body
]

#let scheme = image("./diagram.png", height: 5.3cm)
#figure(caption: "局部放电测试系统框图", scheme)

#[
  #show heading: set text(size: 0em)
  == 1
  == 2
]

== 原始数据

// 放电量
#let x = (50, 200, 300, 500, 800)
// 电压
#let y = (
  (0.17, 0.16, 0.19, 0.20, 0.19, 0.19, 0.28, 0.23, 0.20),
  (0.31, 0.44, 0.40, 0.34, 0.33, 0.44, 0.38, 0.28, 0.33),
  (0.68, 0.48, 0.65, 0.66, 0.93, 0.64, 0.65, 0.82, 0.62),
  (1.05, 0.88, 0.92, 0.60, 1.02, 1.00, 1.40, 1.15, 1.07),
  (1.93, 1.50, 1.97, 2.30, 1.86, 1.80, 2.00, 1.99, 1.92),
)

#let m = 9

#figure(
  caption: "原始数据",
  table(columns: range(m+1).map(_ => auto),
    table.header(
      table.cell(rowspan: 2)[放电量#"\n"$"/pC"$],
      table.cell(colspan: m, align: center)[电压$"/V"$],
      ..range(m).map(x => [#(x+1)])
    ),
    ..y.enumerate().map(group => ([#x.at(group.at(0))], ..group.at(1).map(x => r0(x)))).flatten()
  )
)

// y 的数据还需要预处理去掉粗大误差

== 粗大误差的剔除

#let alpha = .05
由于重复测量的数据组数小于10，数据不一定符合正态分布，无法使用 3sigma。

使用Romanovsky剔除粗大误差。选取显著度水平 $#sym.alpha=#alpha$。

每组数据都是等精度独立测量。

#"\n\n"

#hr

#let y_ = y
#for (i, (x, group)) in x.zip(y).enumerate() {
  [当放电量为 #qty(x, "pC") 时，]
  let (content, group_) = roman(group, alpha)
  content
  y_.at(i) = group_
  hr
}

== 剔除粗大误差后的数据

#figure(caption: "剔除粗大误差后的数据",
table(
  columns: range(m+1).map(_ => 1fr),
  table.header("N", ..range(m).map(x => [#(x+1)])),
  ..x.zip(y_).map(((x, g)) => {
    let cells = g.map(c => r0(c) + " V")
    for i in range(m - g.len()) {
      cells.push(table.cell(align: center, line(length: 3.5em, angle: 14deg)))
    }
    (table.cell([#x pC], align: right), ..cells)
  }).flatten()
))

#regression(
  x,
  y_,
  x_unit: "pC",
  y_unit: $upright(V)$ // https://github.com/typst/typst/issues/366#issuecomment-1868963477
)

== 误差源分析

=== 传感器导致的误差
  - 由于在放电过程中存在放热现象，传感器并不能工作在稳定的环境内，由于温度变化，传感器温漂将会带来误差。
  - 如果传感器的响应时间较慢，测得的电压值会小于局部放电的瞬时的电压峰值。
  - 如果传感器的分辨力不足，将会导致测量值的精确度不够，使得误差增大。
=== 数据传输和存储造成的误差
  - RS485/232作为串口通信的功能，若没有选择校验方式，则接收到的数据流可能会因噪声、干扰、失真或比特同步错误而使流中的某一个或几个比特翻转。
  #figure(caption: "RS485/232通信模块", image("./rs.jpg", width: 55%))
  - 未使用 ECC 的 SRAM 存储器也有可能发生比特翻转，导致数据错误。
  #figure(caption: "SRAM存储器的可能的比特错误发生方式", image("./sram-bit-error-e.svg", width: 70%))

=== 数据处理的误差

在数据处理中，如果算法编写不当，会导致数据处理的误差增大。在数值计算中，IEEE 754 浮点数标准的舍入误差也会导致误差增大。

=== 放大器及滤波电路模块

由于环境中的电磁干扰带来的噪声影响，如果滤波器并未完全消除噪声，放大器将会增大噪声对于所测数据的影响，导致误差增大。

=== ADC模数转换器

在采样过程中，由于采样频率低，采样周期长，对于电压信号的测量范围的覆盖不够全面，也会导致测量不到电压峰值，使测量值偏低。

=== 环境因素带来的误差

环境条件由于放电过程所伴随的电、声、光、热等现象，会持续改变，由此导致环境因素的不稳定，系统将会受到影响，使得误差增大。

== 系统精度提高方案

=== 选择合适的校验方式

奇偶校验能够检测出信息传输过程中的部分误码（1位误码能检出，2位及2位以上误码不能检出），使用简单，同时，它不能纠错。在发现错误后，只能要求重发。CRC循环冗余校验。检错和纠错能力强，可以用于实现差错控制。

=== 改进采样方式

根据 Nyquist 采样定理，为了正确地重构一个信号，采样频率应至少为信号最高频率的两倍。如果采样频率低于这个标准，就会发生欠采样。因此，对于 ADC，可以增大采样频率，增大采样带宽，得到更多的数据量，保证信号峰值被测量到。

=== 减少电磁干扰

确保所有设备都正确接地，使用屏蔽电缆和屏蔽组件。

=== 更换传感器

选择更稳定、性能更好的传感器，并在使用前校准。

=== 选择更好的测量方案

局部放电光纤传感检测法是目前较为常见的检测方法。因其能够实现长距离、分布式、快速实时检测，且所用传感光纤具有本质安全，抗电磁干扰，铺设灵活等优点为局部放电的检测提供了新的思路。

自从Bucaro等人于1977年首次报道了使用光纤 Mach-Zehnder 干涉仪进行声检测以来，*光纤干涉传感器已成为声学测量的重要技术*。2007 年，IEEE 标准规定局部放电产生的超声波范围为 $50 "~ " #qty(300, "kHz")$。2014 年，王伟等人提出了一种基于 Fabry-Perot 干涉仪的声传感器，并*验证了局部放电电荷量与局放超声信号幅值之间的关系*。

@sagnac 是基于Sagnac干涉仪的多点局部放电检测系统。

#figure(caption: "检测系统结构示意图")[
  #image("./sagnac.png", width: 70%)
]<sagnac>
由于使用的光纤具有抗电磁干扰、绝缘性能极佳、体积小、布置方式灵活、灵敏度高、耐腐蚀等特点，工作状态不会受到影响。抗干扰能力更强。
