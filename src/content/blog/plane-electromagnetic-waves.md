---
title: 平面电磁波的表达式
description: 平面电磁波可能是三维的波的最简单的例子．
date: 2023-09-26 22:32:32
draft: false
tags:
- 光学
categories:
- 页面仔的自我修养
- 题解
- Selected
# icon: "tabler:building-bridge"
layout: "@/layouts/Default.astro"
noscript: true
mathjax: true
licence: CcByNc
---

平面电磁波是指在与传播方向正交的平面上各点电场或磁场具有相同值的电磁波．平面电磁波可能是三维的波的最简单的例子．根据傅里叶变换，任何一个波都可以看作是一系列平面波的叠加．因此，平面电磁波是一种非常重要的波．

平面电磁波可以由其电场 $\bm E$ 或磁场 $\bm B$ 的表达式来描述．但是，由于人眼和仪器更容易观测到电场，因此我们通常使用电场的表达式来描述平面电磁波．为了便于计算，其表达式有多种形式．

## 体现平面简谐波周期性的量

在分析其表达式之前，我们需要先定义一些量．

- 振幅 $A$
- 初相位 $\varphi_0$

这两个量在接下来的变换中都很简单．接下来：

| 空间                                                                 | 时间                                                                               |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 空间周期 aka 波长 $\lambda$                                          | 时间周期 aka 周期 $T$                                                              |
| 空间频率 aka 波数 $\tilde\nu = \dfrac{1}{\lambda}$                                        | 时间频率 $\nu=\dfrac{1}{T}$                                                        |
| 空间角频率 aka 波矢的绝对值 <br /> $\color{#b42242}k = \dfrac{2\pi}{\lambda}$ | 时间角频率 aka 角频率<br /> $\color{#126a1e}\omega = 2\pi\gamma = \dfrac{2\pi}{T}$ |

空间与时间量的关系很好理解．比如，空间周期与时间周期之比就是波速 ${\color{#aa34ae}v = \dfrac{\lambda}{T}} = \lambda\nu = \dfrac \omega k$．

## 电场的表达式

### 沿坐标轴传播

那么，沿 $z$ 轴传播的平面简谐电磁波的电场表达式如下：

$$
\begin{align}
\bm{E} &= \bm{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-\dfrac{t}{T}\right) +\varphi_0\right) \\
\bm{E} &= \bm{A}\cdot \cos \left(kz-\omega t +\varphi_0\right) \\
\bm{E} &= \bm{A}\cdot \cos \left(\omega \left(\dfrac zv-t\right) +\varphi_0\right)
\end{align}
$$

记住式 $(1)$，其余的两个式子很好推导：

$$
\begin{align*}
\bm{E} &= \bm{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-\dfrac{t}{T}\right) {\color{#666}+\varphi_0}\right) \\
&= \bm{A}\cdot \cos \left({\color{#b42242}\dfrac{2\pi}{\lambda}}-\color{#126a1e}\dfrac{2\pi}{T}\color{black}t {\color{#666}+\varphi_0}\right) \\
&= \bm{A}\cdot \cos \left(\color{#b42242}k\color{black}z-{\color{#126a1e}\omega} t {\color{#666}+\varphi_0}\right).
\end{align*}
$$

$$
\begin{align*}
\bm{E} &=
\bm{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-{\color{#1472c9}\dfrac{\color{black}t}{T}}\right) {\color{#666}+\varphi_0}\right) \\
&= \bm{A}\cdot \cos \left({\color{#126a1e}\dfrac{2\pi}{\color{#1472c9}T}} \left({\color{#aa34ae}\dfrac{\color{#1472c9}T}{\lambda}}z - t\right) {\color{#666}+\varphi_0}\right) \\
&= \bm{A}\cdot \cos \left(\color{#126a1e}\omega\color{black} \left({\color{#aa34ae}\dfrac {\color{black}z}v}-t\right) {\color{#666}{\color{#666}+\varphi_0}}\right).
\end{align*}
$$

### 沿任意方向传播

我们令波数为矢量 $\bm{\tilde \nu}$ 的模，则有波数 $\bm k = 2\pi\bm{\tilde \nu} = k \cdot \bm{\hat k}$，其中 $\bm{\hat k}$ 是波矢的单位矢量．

通过将 $(2)$ 式中的 $z$ 替换为矢位置 $\bm r$，将 $k$ 换为波矢 $\bm k$，我们可以得到沿任意方向传播的平面简谐电磁波的电场表达式：

$$\bm{E} = \bm{A}\cdot \cos \left(\bm k \cdot \bm r - \omega t +\varphi_0\right).$$

复数形式为：

$$
\begin{align*}
   \bm{E} &= \bm A\cdot e^{i\left(\bm k \cdot \bm r - \omega t\right)} \\
          &= \bm A\cdot e^{i\left(\bm k \cdot \bm r\right)} \cdot e^{-i\omega t}.
\end{align*}
$$

其中 $e^{-i\omega t}$ 为时间相位因子．

展开后其实有虚部，但是由于我们只关心实部，所以虚数项可以忽略．

通常写成笛卡尔坐标系下的形式：

$$
\bm E = \bm A\cdot \exp \left(i(\alpha x + \beta y + \gamma z - \omega t)\right).
$$

当然，$\alpha^2 + \beta^2 + \gamma^2 = 1$．

## 磁场的表达式

对于沿 $z$ 轴传播的电磁波，设 $\bm E$ 的振幅方向沿 $x$ 轴．记电场振幅大小 $|A| = E_0$，磁场振幅大小 $B_0$．由

$$c = \dfrac 1{\sqrt{\epsilon_0\mu_0}},$$

$$\dfrac{\partial B_x}{\partial t} = - \dfrac{\partial}{\partial z} E_0 \, \cos(kz - \omega t) = kE_0 \, \sin(kz - \omega t),$$

有

$$ B_x(z,t) = \dfrac k \omega E_0\cos(kz-\omega t) = \dfrac 1 c E_0 \cos(kz - \omega t), $$

即

$$
\begin{align*}
E_x(z,t) &= E_0 \, \cos \, (kz - \omega t)\\
B_y(z,t) &= B_0 \, \cos \, (kz - \omega t)\\
\dfrac{E_x}{B_y} &= \dfrac{E_0}{B_0} = c.
\end{align*}
$$

波矢 $\bm k$ 的定义为 $\bm k = \dfrac{\omega}{c} \bm{\hat k}$，所以其实

$$\bm k = \bm E \times \bm B.$$

结论是，电磁波的电场强度、磁场强度和传播方向三者两两垂直．用 $\bm{E}$ 和 $\bm{B}$ 表示电磁波的电场和磁场矢量，则电磁波的传播方向沿着矢量 $\bm{E} \times \bm{B}$ 的方向，并且振幅 $E_0$ 与 $B_0$ 之比等于波速 $c$．

![](/optics/kbe.svg)

做题时，为了判断方向，可以记住 $\bm E$、$\bm B$ 和 $\bm k$ 三者按顺序呈右手螺旋，即

$$
\left\{
\begin{array} {lr}
\bm E \times \bm B & = & \bm k \\
\bm B \times \bm k & = & \bm E \\
\bm k \times \bm E & = & \bm B.
\end{array}
\right.
$$

![使用右手定则确定外积的方向](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Right_hand_rule_cross_product.svg/1024px-Right_hand_rule_cross_product.svg.png)

## 光程差和相位差

在均匀介质中，光程是介质折射率 $n$ 与光线在介质中传播距离 $s$ 的乘积，即 $ns$．

$$Δx=(n−n_0)h$$

在真空中，$Δx = cΔt.$

> 光程和光程差的重要在它们确定光的相位，而相位决定了干涉和衍射现象． [^wp-opl]

[^wp-opl]: [Optical path length - Wikipedia](https://en.wikipedia.org/wiki/Optical_path_length)

那么当光程差为 $Δx$ 时，由

$$
\begin{align*}
E&= A \cos \left( k (x + \Delta x) - \omega t + \varphi_0 \right)\\
&= A \cos \left( kx + k\Delta x - \omega t + \varphi_0 \right)\\
\end{align*}
$$

我们可以得到相位差为

$$ \Delta \varphi = k\Delta x = \dfrac{2\pi}{\lambda} \Delta x.$$
