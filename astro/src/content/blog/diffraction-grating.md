---
title: 光栅衍射
description: 光栅是刻有平行等宽、等距狭缝的平面玻璃或金属片。
date: 2022-12-26 01:49:21
categories: 光学
tags: 备忘
mathjax: true
layout: "@/layouts/Default.astro"
---

> <i class="fa-solid fa-arrows-turn-to-dots"></i> **消歧义**：本页面中的「光栅」指的是刻有平行等宽、等距狭缝的平面玻璃或金属片，而非「栅格化」．

![衍射条纹](https://upload.wikimedia.org/wikipedia/commons/d/da/Density_plot_of_diffraction_grating.jpg)

## 光栅常数

**光栅**是刻有平行等宽、等距狭缝的平面玻璃或金属片．缝的宽度用 $a$ 表示，非缝部位的宽度用 $b$ 表示，相邻两缝的中心线的距离用 $d$ 表示，称为**光栅常数**，有 $d=a+b$．

### 例题

一个每毫米有 $800$ 条刻线的光栅的光栅常数为 $d=\dfrac 1 {800} = 1.25\times 10^{-6}\mathrm m$．

## 主极大

$$d\sin \theta=\pm k\lambda, k=0,1,2…$$

此描述光栅结构与光的入射角和衍射角之间关系的公式即为**光栅方程**．其中 $\theta$ 为衍射角，即波衍射时行进方向与法线之间的角度． $\lambda$ 为光线的波长． $k$ 向下取整，即 $k = \big[\dfrac {d\sin\theta}\lambda\big]\approx\big[\dfrac{a+b}\lambda\big]$ 为主极大的最大极数．加上 0 级主极大，一共有 $2[k]+1$ 个主极大．

近似后，有角位置 $\theta=\dfrac{k\lambda}d$ ，线位置 $x=\theta\cdot f=fk\dfrac \lambda d$ ．

### 例题

> 用波长为 $\lambda$ 的单色平行光垂直入射在一块多缝光栅上，其光栅常数 $d＝3$ $\mathrm{mm}$ ，缝宽 $a＝1$ $\mathrm{mm}$ ，则在单缝衍射的中央明条纹中共有______条谱线（主极大）．

本题缺级从 $k=3$ 开始，因此中央明条纹中有 $0$，$±1$，$±2$ 共五条谱线．

## 缺级

除了双缝干涉，光栅间还会发生单缝衍射，部分明条纹会不见，即为 **缺级**：

$$k=\dfrac{d}{a}k',k=1,2,3…$$

第 $\pm k$ 级会发生缺级．