---
title: 人眼光学系统
description: 眼睛作为一个光学系统
photo:
  src: https://user-images.githubusercontent.com/20166026/244607878-b6545089-1788-4adc-bcde-c2bdaca67b1b.jpg
date: 2023-06-09 13:04:03
categories: 光学
tags: 备忘
math: mathjax
# icon: microscope-lens
layout: "@/layouts/Default.astro"
ext: md
noscript: false
---

## 光学系统

**瞳孔**为孔径光阑．

**明视距离**为 25 mm．

## 调节

**远点距离** $R=\dfrac{1}{l_r},$

**近点距离** $P=\dfrac{1}{l_p}.$

**调节能力** $A = R - P.$

不知道为什么是这三个字母，姑且用 **r**emote、**p**roximate 同 **a**ccommodation 记忆．

以上 $A, R$ 和 $P$ 的单位为**屈光度** $\mathrm D = \mathrm m^{-1}$ ．

![近点和远点（公有领域）](https://upload.wikimedia.org/wikipedia/commons/e/ea/Accommodation_%28PSF%29.svg)

## 反常眼

| 类型   | 定义         | 校正                    |
| ------ | ------------ | ----------------------- |
| 正常眼 | $l_r=\infty$ | N/A                     |
| 近视眼 | $l_r<0$      | 眼前加负透镜， $f'=l_R$ |
| 远视眼 | $l_r>0$      | 眼前加正透镜， $f'=l_R$ |

## 眼镜

$D (D<0)$ 度的近视镜的焦距 $f'=1/D.$ 佩戴 $D$ 度的近视镜后远点距离 $R'=R-D.$

### 配近视镜

<b>对 $1\ \mathrm m$ 以外的景物看不清，须配怎样的眼镜?</b>

对 $1 \mathrm{m}$ 以外的景物看不清，说明眼睛近视，须配负透镜．由

$$\dfrac{1}{f_0'}=\dfrac{1}{l_{\mathrm{r}}}=\dfrac{1}{-1}=-1 \mathrm{D}$$

或

$$\frac{1}{f_0'}=\frac 1{l'}-\frac{1}{l}=\frac{1}{-1}-\frac{1}{-\infty}=-1 \mathrm D$$

可知须配 $100$ 度的近视镜．

### 配远视镜

<b>对 $1\ \mathrm m$ 以内看不清，须配怎样的眼镜？</b>

${1\ \mathrm{m}}$ 以内看不清，说明眼睛远视，须配正透镜．由

$$\frac{1}{f_0}=\frac 1{l'}-\frac 1 l=\frac{1}{-1}-\frac{1}{-0.25}=3 \mathrm{D}$$

可知须配 $300$ 度的远视镜．

## 分辨率

人眼的空间分辨率用**极限分辨角** a.k.a. **视角鉴别率** $\varepsilon$ 表示，是眼睛恰巧能分开的两点对眼睛物方节点所张的角度．

由**瑞利判据**（Rayleigh criterion），

$$\varepsilon = \frac{1.22\lambda}D.$$

对于 $\lambda=555\ \mathrm{nm}$ 的光线，

$$\varepsilon=\frac{140}D ('').$$

其中 $D$ 为瞳孔直径．照明良好的情况下 $\varepsilon=60''$ .

眼睛观察方便也不吃力时，分辨角为 $2''\sim 4''$ .

人眼的时间分辨率为 $25\ \mathrm{f/s}.$

## 立体视觉

1. **视觉基线长度** $b$ 为两眼节点间长度；
2. **视角差** $\theta_A = \dfrac b L$ ，其中 $L$ 为物体距视觉基线的垂直距离；
3. **立体视差** a.k.a. **视差** $\Delta\theta$ 是不同视角差之间的差值；
4. **体视锐度** $\Delta\theta_{\mathrm{min}}$ 是人眼可感觉到的视差的最小值，一般为 $10''$ ；
5. **立体视觉半径** $L_\mathrm{max} = \dfrac b {\Delta\theta_\mathrm{min}}$ 是人眼可分辨远近的最大距离；
6. **立体视觉阈** $\Delta L=\dfrac{\Delta\theta L^2}{b}$ 是双眼能够分辨两点间的最小距离；
7. **立体视觉误差** $\Delta L |_{\Delta\theta=\Delta\theta_\mathrm{min}}=\dfrac{\Delta\theta_\mathrm{min} L^2}{b}.$ <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_hbWhzLFJJc.json" mode="bounce" background="transparent"  speed="0.9"  style="width: 64px; height: 64px;"  loop  autoplay></lottie-player>
