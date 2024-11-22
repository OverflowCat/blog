#set page(width: 34em, height: auto, margin: (top: 1em, rest: 0em))
#set text(font: "Noto Serif CJK SC", lang: "zh", cjk-latin-spacing: auto, size: .95em)
#import "util.typ": *

第二次旋转是绕与 #long(0)、#long(180) 经线平面垂直的过地心的直线旋转，从 #lat(60) 处变至 #lat(30) 处，旋转了 $30 degree$。

该直线与 $x$ 轴平行，与 $y$ 轴垂直，与 $z$ 轴相交。

将该直线表示为 $bold(u) = (1, 0, 0)$，则

$ q_2 &= cos(theta/2) + bold(u) sin(theta/2)\
      &= cos(15 degree) + bold(u) sin(15 degree)\
      &= (1 + sqrt(3))/(2 sqrt(2)) + (-1 + sqrt(3))/(2 sqrt(2)) #i. $

// array([ 0.6830127,  0.1830127, -0.1830127, -0.6830127])

两次旋转可复合为

$ q = q_2 q_1 = 0.683 + 0.183#i - 0.183#j - 0.683#k. $

对于一个相对于坐标系 $T_1$ 不发生旋转变换的矢量 $overline(V) = x#i + y#j + z#k$，在新坐标系 $T_2$ 上的投影

$ overline(V') = q overline(V) q^*. $
