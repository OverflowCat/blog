---
title: 平面电磁波的表达式
description: 平面电磁波可能是三维的波的最简单的例子。
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
---

平面电磁波是指在与传播方向正交的平面上各点电场或磁场具有相同值的电磁波。平面电磁波可能是三维的波的最简单的例子。根据傅里叶变换，任何一个波都可以看作是一系列平面波的叠加。因此，平面电磁波是一种非常重要的波。

平面电磁波可以由其电场 $\boldsymbol E$ 或磁场 $\boldsymbol B$ 的表达式来描述。但是，由于人眼和仪器更容易观测到电场，因此我们通常使用电场的表达式来描述平面电磁波。为了便于计算，其表达式有多种形式。

## 体现平面简谐波周期性的量

在分析其表达式之前，我们需要先定义一些量。

- 振幅 $A$
- 初相位 $\varphi_0$

这两个量在接下来的变换中都很简单。接下来：

| 空间                                                                 | 时间                                                                               |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 空间周期 aka 波长 $\lambda$                                          | 时间周期 aka 周期 $T$                                                              |
| 空间频率 $\dfrac{1}{\lambda}$                                        | 时间频率 $\nu=\dfrac{1}{T}$                                                        |
| 空间角频率 aka 波数<br /> $\color{#b42242}k = \dfrac{2\pi}{\lambda}$ | 时间角频率 aka 角频率<br /> $\color{#126a1e}\omega = 2\pi\gamma = \dfrac{2\pi}{T}$ |

空间与时间量的关系很好理解。比如，空间周期与时间周期之比就是波速 ${\color{#aa34ae}v = \dfrac{\lambda}{T}} = \lambda\nu$。

## 电场的表达式

那么，沿 $z$ 轴传播的平面简谐电磁波的电场表达式如下：

$$
\begin{align}
\boldsymbol{E} &= \boldsymbol{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-\dfrac{t}{T}\right) +\varphi_0\right) \\
\boldsymbol{E} &= \boldsymbol{A}\cdot \cos \left(kz-\omega t +\varphi_0\right) \\
\boldsymbol{E} &= \boldsymbol{A}\cdot \cos \left(\omega \left(\dfrac zv-t\right) +\varphi_0\right)
\end{align}
$$

记住式 $(1)$，其余的两个式子很好推导：

$$
\begin{align*}
\boldsymbol{E} &= \boldsymbol{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-\dfrac{t}{T}\right) {\color{#666}+\varphi_0}\right) \\
&= \boldsymbol{A}\cdot \cos \left({\color{#b42242}\dfrac{2\pi}{\lambda}}-\color{#126a1e}\dfrac{2\pi}{T}\color{black}t {\color{#666}+\varphi_0}\right) \\
&= \boldsymbol{A}\cdot \cos \left(\color{#b42242}k\color{black}z-{\color{#126a1e}\omega} t {\color{#666}+\varphi_0}\right).
\end{align*}
$$

$$
\begin{align*}
\boldsymbol{E} &=
\boldsymbol{A}\cdot \cos \left(2\pi \left( \dfrac{z}{\lambda}-{\color{#1472c9}\dfrac{\color{black}t}{T}}\right) {\color{#666}+\varphi_0}\right) \\
&= \boldsymbol{A}\cdot \cos \left({\color{#126a1e}\dfrac{2\pi}{\color{#1472c9}T}} \left({\color{#aa34ae}\dfrac{\color{#1472c9}T}{\lambda}}z - t\right) {\color{#666}+\varphi_0}\right) \\
&= \boldsymbol{A}\cdot \cos \left(\color{#126a1e}\omega\color{black} \left({\color{#aa34ae}\dfrac {\color{black}z}v}-t\right) {\color{#666}{\color{#666}+\varphi_0}}\right).
\end{align*}
$$

## 磁场的表达式

电磁波的电场强度、磁场强度和传播方向三者两两垂直。用 $\mathbf{E}$ 和 $\mathbf{B}$ 表示电磁波的电场和磁场矢量，则电磁波的传播方向沿着矢量$\mathbf{E} \times \mathbf{B}$的方向。

磁场

## 光程差和相位差

在均匀介质中，光程是介质折射率 $n$ 与光线在介质中传播距离 $s$ 的乘积，即 $ns$。

$$δΔ=(n−n_0)h$$

> 光程和光程差的重要在它们确定光的相位，而相位决定了干涉和衍射现象。 [^wp-opl]

[^wp-opl]: [Optical path length - Wikipedia](https://en.wikipedia.org/wiki/Optical_path_length)


那么假设我们有两条光波，

