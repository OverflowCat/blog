---
title: 拉普拉斯变换速查表
date: 2022-12-16T22:16:47.000Z
categories: 动态列表
tags:
- 积分变换
- 数学
mathjax: true
---
> <i class="fa-solid fa-infinity"></i> 本表是**动态列表**。动态列表是指**未完成的列表**。它也许永远不会被完整地完成。

<picture>
  <source srcset="https://raw.githubusercontent.com/OverflowCat/blog/4571def89a28dea9a549678b2f58be7f3743fe5d/l-on-blackboard.webp" type="image/webp">
  <source srcset="https://user-images.githubusercontent.com/20166026/208291325-61a663c7-dac4-4ae6-b41c-b2b0a53905fe.png" type="image/jpeg"> 
<img src="https://user-images.githubusercontent.com/20166026/208291325-61a663c7-dac4-4ae6-b41c-b2b0a53905fe.png" width="210px" alt="黑板上的字母L。这是一幅AI生成的画作。">
</picture>

| 时域 $f(t)$        | 频域 $F(s)=\mathscr L[f(t)]$    |
| ------------------ | ------------------------------- |
| $$\delta'(t)$$     | $$s$$                           |
| $$\delta(t)$$      | $$1$$                           |
| $$u(t)$$           | $$\frac 1 s$$                   |
| $$e^{-at}$$        | $$\frac 1 {s+a}$$               |
| $$te^{-at}$$       | $$\frac{1}{(s+a)^2}$$           |
| $$t$$              | $$\frac 1 {s^2}$$               |
| $$\frac{t^2}2$$    | $$\frac{1}{s^3}$$               |
| $$\frac{t^n}{n!}$$ | $$\frac{1}{s^{n+1}}$$           |
| $$\delta(t-t_0)$$  | $$e^{-{t_0}s}$$                 |
| $$\cos(\alpha t)$$ | $$\frac s {s^2+\alpha^2}$$      |
| $$\sin(\alpha t)$$ | $$\frac \alpha {s^2+\alpha^2}$$ |
| $$f(a t)$$         | $$\frac{1}{\|a\|}f(\frac sa)$$  |
| $$f(t-a)u(t-a)$$   | $$e^{-as} F(s)$$                |
| $$e^{at} f(t)$$    | $$F(s-a)$$                      |

## 微分和积分

| 时域 $f(t)$                              | 频域 $F(s)=\mathscr L[f(t)]$                |
| ---------------------------------------- | ------------------------------------------- |
| $$\frac{\mathrm df(t)}{\mathrm dt}$$     | $$sF(s)-f(0)$$                              |
| $$\frac{\mathrm d^2f(t)}{\mathrm dt^2}$$ | $$s^2F(s)-sf(0)-f'(0)$$                     |
| $$\frac{\mathrm d^nf(t)}{\mathrm dt^n}$$ | $$s^nF(s)-\sum^n_{k-1}s^{k-1}f^{(n-k)}(0)$$ |
| $$tf(t)$$                                | $$-F'(s)$$                                  |
| $$(-1)^n t^n f(t)$$                      | $$F^{(n)}(s)$$                              |
| $$\frac 1 t f(t)$$                       | $$\int_s^\infty F(σ)\mathrm dσ$$            |