#import "./helper.typ": *
#import "@preview/unify:0.5.0": num, qty
#let IS_SLIDES = false
#let slidebreak() = if IS_SLIDES {pagebreak()} else []
#let transpose(data) = {
  let width = data.at(0).len()
  let height = data.len()
  let res = data.at(0).map(_ => data.map(_ => none))
  for i in range(width) {
    for j in range(height) {
       res.at(i).at(j) = data.at(j).at(i)
    }
  }
  res
}

#let regression(x, _y, x_unit: "", y_unit: "", estimate: none, control: none) = {
let N = x.len()
let y = ()
let REP = false
let m = average(_y.map(g => g.len()))
y = _y.map(g => average(g))
// = 一元线性回归
assert(x.len() == y.len())

// 单位的显示
let XU = x_unit
let XU2 = ""
let YU = y_unit
let YU2 = ""
let XYU = []
let YXU = []
if XU != "" {
  XU2 = $" "XU^2$
  XYU += XU
  YXU += "/" + XU
}
if YU != "" {
  YU2 = $" "#y_unit^2$
  if XU != "" {
    XYU += $dot.c$
  }
  XYU += YU
  YXU = YU + YXU
}
if XYU != "" {
  XYU = " " + XYU
}

[== 每组求平均后的数据]

figure(
caption: "每组求平均后的数据",
table(
  columns: (auto, ..range(N).map(x => 1fr)),
  table.header("N", ..range(N).map(x => [#(x+1)])),
  $x"/"XU$, ..x.map(x => [#x]),
  $y"/"YU$, ..y.map(y => [#c(y)]),
)
)

[== 回归方程的确定]

let DS = $sum^N_(t=1)$

[=== 计算 $l_(x x)$]
// 计算x的均值
let sum_x = x.sum()

let x_avg = sum_x / N
$ DS x_t = #sum_x XU, overline(x) = #c(x_avg) XU $

// 计算x的平方的平均值
let x_sq = x.map(x => calc.pow(x, 2))
let sum_x_sq = x_sq.sum()

let x_sq_avg = calc.pow(sum_x, 2) / N
$ DS x_t^2 = #num(rx(sum_x_sq)) XU2 , quad (DS x_t)^2 / N = #num(rx(x_sq_avg)) XU2 $


let l_xx = sum_x_sq - x_sq_avg

$ l_(x x) = DS x_t^2 - (DS x_t)^2 / N = #num(rx(l_xx)) XU2 $

slidebreak()

[=== 计算 $l_(y y)$]
// 计算y的均值
let sum_y = y.sum()

let y_avg = sum_y / N
$ DS y_t = #c(sum_y)" "YU, overline(y) = #c(y_avg)" "YU $

// 计算y的平方的平均值
let y_sq = y.map(y => y*y)
let sum_y_sq = y_sq.sum()

let y_sq_avg = calc.pow(sum_y, 2) / N
$ DS y_t^2 = #num(ry(sum_y_sq)) YU2, quad (DS y_t)^2 / N = #num(ry(y_sq_avg)) YU2 $

let l_yy = sum_y_sq - y_sq_avg

$ l_(y y) = DS y_t^2 - (DS y_t)^2 / N = #num(ry(l_yy)) YU2 $

slidebreak()

[=== 计算 $l_(x y)$]

let sum_xy = x.zip(y).map(((x, y)) => x * y ).sum()
let xy_sum_avg = (sum_x * sum_y) / N
$ DS x_t y_t = #num(rxy(sum_xy)) XYU, quad ((DS x_t)(DS y_t)) / N = #num(rxy(xy_sum_avg)) XYU $

let l_xy = sum_xy - xy_sum_avg
$ l_(x y) = DS x_t y_t - ((DS x_t)(DS y_t)) / N = #num(rxy(l_xy)) XYU $

slidebreak()

[=== 计算 $b$ 和 $b_0$]

let b = l_xy / l_xx
$ b = l_(x y) / l_(x x) = #num(rxy(b)) YXU $

let b_0 = y_avg - b * x_avg
$ b_0 = overline(y) - b overline(x) = #num(rxy(b_0)) YU $

[最终的回归直线为]

$ hat(y) = #num(r(b_0)) YU + (#num(r(b)) YXU) x, $

[如图所示。]

import "@preview/plotst:0.2.0": *
let xs = range(0, 900, step: 50)
let ys = xs.map(x => b_0 + b * x)
let data = xs.zip(ys)

let x_axis = axis(min: 0, max: 900, step: 100, location: "bottom", title: [放电量 / pC])
let y_axis = axis(min: 0, max: 2.2, step: 0.2, location: "left", helper_lines: true, value_formatter: i => if i < 1 {round(i, 1)} else {round(i, 2)}, title: [电压 / V])

let pl = plot(data: data, axes: (x_axis, y_axis))
figure(caption: "回归直线", graph_plot(pl, (36em, 20em), caption: none))


[== 方差分析]

$ m = #m $

let DM = $sum^m_(i=1)$
let (S, U, Q) = (0., 0., 0.)

// REP
S = _y.flatten().map(yti => calc.pow(yti - y_avg, 2)).sum()
U = m * b * l_xy
Q = S - U
let vU = 1
let QL = m * l_yy - U
// let QE = range(N).map(t => _y.map(y_group => calc.pow(y_group.at(t) - y.at(t), 2)).sum()).sum()
let QE = _y.map(group => {
  let avg = average(group)
  group.map(
    y => calc.pow(y - avg, 2)
  ).sum()
}).sum()
let vL = N - 2
let vE = N * (m - 1)
[
/ 总离差平方和: $ S = #c(S) YU2. $
/ 回归平方和: $ U = m b l_(x y) = #c(U) YU2. $
/ 残余平方和: $ Q &= l_(y y) - b l_(x y) = S - U = #c(Q) YU2,\
Q_E &= DS DM (y_(t i) - overline(y)_t)^2 = #c(QE) YU2,\
Q_L &= m l_(y y) - U = #c(QL) YU2.
$
]
let F1 = (QL / vL) / (QE / vE)
let F2 = (U / vU) / ((QE + QL) / (vE + vL))

// 这边没写 d.f. 的计算过程

/*
$
F_1 = (Q_L / v_L) / (Q_E / v_E) = #c(F1), quad
F_2 = (U / v_U) / ((Q_E + Q_L) / (v_E + v_L)) = #c(F2). \
sigma_E = sqrt(Q_E / v_E) = #c(calc.sqrt(QE / vE)). quad
sigma_L = sqrt(Q_L / v_L) = #c(calc.sqrt(QL / vL)).
$
*/

[
== 显著性检验

=== $bold(F)$ 检验
]
let vU = 1
// let vQ = N - 2
let vL = N - 2
let vE = N*(m - 1)
let vS = N*m - 1
let F = calc.round((U/vU)/(QE/vE), digits: 2)
let F1 = calc.round((QL / vL) / (QE / vE), digits: 2)
let F2 = calc.round((U/vU) / ((QE + QL) / (vE + vL)), digits: 2)
let UvU = U / vU
let QLvL = QL / vL
let QEvE = QE / vE

[
$
F =& (U "/" v_U) / (Q_E "/" v_E)
  = (U "/" 1) / (Q "/" (N - 2)) \
  =& #c(U) / (#c(Q) "/" #vE) \
  =& #c(F).
$

故一元回归方程拟合显著。

$
F_1 =& (Q_L "/" v_L) / (Q_E "/" v_E) = #F1.
\
F_2 =& (U"/"v_U) / ((Q_E + Q_L) "/" (v_E + v_L))
= #F2.
$

失拟平方和对实验误差影响较小；一元线性回归方程拟合得好。

== 方差分析表
显著度水平 $alpha = 0.01$
]

let sigma2 = Q / (N - 2)
let dash = [#line(length: .9em)]
table(
  align: center,
  columns: (auto, auto, auto, auto, 1fr, auto),
  table.header([来源], [平方和], [自由度], [方差], $F$, $F_alpha$),
  [回归], $U = #c(U)$, $v_U=#vU$, $U"/"V_U \
  = #c(UvU)$, $F = #F$, $F_alpha (1, N(m-1))\ = 7.56$,
  // [残余], $Q = #c(Q)$, $#v_Q$,
  [失拟], $Q_L=#c(QL)$, $v_L &= N-2 \
  &= #vL$, $Q_L"/"V_L \
  = #c(QLvL)$, $F_1 = F1$, $F_alpha (v_L, v_E) = 4.51$,
  [误差], $Q_E=#c(QE)$, $v_E &= N(m-1) \
  &= #vE$, $Q_E"/"V_E \
  = #c(QEvE)$, dash, dash,
  [总计], $S = #c(S)$, $v_S &= N m-1 \
  &= #vS $, dash, $F_2 = F2$, dash
)

let sigma_ = calc.sqrt(sigma2)
/* 在定点的值 */
if estimate != none {
  [
    == 预测问题
    当 $x_0 = estimate$ 时，有
  ]
  let y_0 = b_0 + b * estimate
  $ y_0 = #c(b_0) + (#c(b)) times estimate = #c(y_0) $
  $ sqrt(Q / (N - 2)) = #c(sigma_) $
  if N > 90 {
    [因 $alpha$ = 0.05，查附表 2.1 正态分布表可得 $Z_alpha approx 1.95$，得到]
    let d = 1.95 * sigma_
    $ d = 1.95 times sigma = #c(d) $
    [$y_0$ 的 95% 近似预测区间为 $(#c(y_0 - d), #c(y_0 + d)).$]
  } else {
    let t = 2.31
    [查附表2.3可得 $t_alpha (N-2)= #t.$]
    let d = t * sigma_ * calc.sqrt(1 + 1/N + calc.pow(estimate - x_avg, 2) / l_xx)
    $ delta(x_0) = t_alpha (N-2) sigma sqrt(1 + 1/N + (x_0 - overline(x))^2/l_(x x)) = #c(d). $
    [即预测水平为0.95的区间为 $(#c(y_0 - d), #c(y_0 + d))$．]
  }
}

if control != none {
  let (y01, y02) = control
  [
    == 控制问题
    $ y_"0 1" = y01, y_"0 2" = y02, $
  ]
  $ cases(
    x_1 = 1/b ((y_0)_1 - b_0 plus/* .minus */ Z_alpha sqrt(Q/(N-2))),
    x_2 = 1/b ((y_0)_2 - b_0 minus/* .plus */ Z_alpha sqrt(Q/(N-2)))
  ) $
  if b > 0 {
    $ b > 0, x_1 > x > x_2, $
  } else {
    $ b < 0, x_1 < x < x_2, $
  }
  let Z = 1.95
  let x1 = 1/b*(y01 - b_0 + Z * sigma_)
  let x2 = 1/b*(y02 - b_0 - Z * sigma_)
  [其中 $x_1 = x1, x_2 = x2.$]
}
}
