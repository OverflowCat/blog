#set page(width: 34em, height: auto, margin: (top: 1em, rest: 0em))
#set text(font: "Noto Serif CJK SC", lang: "zh", cjk-latin-spacing: auto, size: .95em)
#import "_util.typ": *

地理坐标系（g 系）原点为载体质心，#xg;在当地水平面内沿当地纬线指向正东，#yg;沿当地子午线指向正北，#zg;沿当地参考椭球的法线指向天顶。

从 $T_1$ 到 $T_2$ 需要经过连续两次平面旋转。

第一次旋转是绕地轴旋转，从 #long(90) 处变至 #long(0) 处，旋转了 $-90 degree$。

地轴与$x$ 轴垂直，与 $z$ 轴偏 $30 degree$。

将地轴表示为 $bold(u) = (0, sin(30 degree)， cos(30 degree))$，则

$ q_1 &= cos(theta/2) + bold(u) sin(theta/2)\
      &= cos(-45 degree) + bold(u) sin(-45 degree)\
      &= sqrt(2)/2 + (0#i + 1/2#j + sqrt(3)/2#k) times (- sqrt(2)/2)\
      &= sqrt(2)/2 - sqrt(2)/4#j - sqrt(6)/4#k. $
