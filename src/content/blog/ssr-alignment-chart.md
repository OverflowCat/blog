---
title: 服务端渲染阵营九宫格
date: 2023-04-09 01:50:00
# photo: https://user-images.githubusercontent.com/20166026/230737062-897858da-a1c4-4fc4-a0a2-cdd59dda3369.png # https://user-images.githubusercontent.com/20166026/230736978-8ee7171a-a6b3-4417-bcf0-729005e23aa8.png
description: 你就说是不是渲染吧！
tags: meme
categories: 页面仔的自我修养
layout: "@/layouts/Default.astro"
noscript: true
---

<blockquote><i class="fa-solid fa-circle-info"></i> 这篇文章显然是经服务端渲染而呈现在你面前的。</blockquote>
<table class="alignment-chart">
  <thead>
    <tr>
      <th></th>
      <th class="h">守序<div>一定要用 JS 框架渲染</div></th>
      <th class="h">中立<div>渲染出来的是 HTML 就行</div></th>
      <th class="h">混乱<div>渲染出来是图形就行</div></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="h">善良</td>
      <td><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"></td>
      <td><img src="https://www.php.net/images/logos/php-logo.svg"></td>
      <td><img src="https://user-images.githubusercontent.com/20166026/230817316-92c7c746-0b5d-4307-90af-08bff113787e.png"></td>
    </tr>
    <tr>
      <td>一定要在<br />服务端渲染</td>
      <td><div class="cat">守序善良</div> Next 是 SSR</td>
      <td><div class="cat">中立善良</div> PHP 是 SSR</td>
      <td><div class="cat">混乱善良</div> RDP 是 SSR</td>
    </tr>
    <tr>
      <td class="h">中立</td>
      <td>
        <div>
          <img loading="lazy" src="https://miro.medium.com/v2/resize:fit:400/1*-8c5bXmKhpKg8NRnBMu0zQ.gif">
        </div>
        <div style="padding-top: 4px;"><img style="background-color: rgb(34, 34, 34);" src="https://pages.github.com/images/logo.svg"></div>
      </td>
      <td>
        <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg">
      </td>
      <td>
        <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Open_Broadcaster_Software_Logo.png/2048px-Open_Broadcaster_Software_Logo.png">
      </td>
    </tr>
    <tr>
      <td>不在直接交互的<br />服务器上渲染也行</td>
      <td><div class="cat">守序中立</div> SSG 是 SSR</td>
      <td><div class="cat">绝对中立</div> CDN 是 SSR</td>
      <td><div class="cat">混乱中立</div> OBS 推流是 SSR</td>
    </tr>
    <tr>
      <td class="h">邪恶</td>
      <td>
        <img src="https://www.electronjs.org/assets/img/logo.svg">
      </td>
      <td>
        <img src="https://webassembly.org/css/webassembly.svg">
      </td>
      <td>
        <img style="background-color: rgb(52, 0, 104);"
          src="https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/330e6487-af90-43c8-a255-63b3440d0e34/StabilityAi_Logo_White-19.png?format=1500w">
      </td>
    </tr>
    <tr>
      <td>用户的电脑<br />也是服务端</td>
      <td><div class="cat">守序邪恶</div> Electron 是 SSR</td>
      <td><div class="cat">中立邪恶</div> WASM 是 SSR</td>
      <td><div class="cat">混乱邪恶</div> Stable Diffusion 是 SSR</td>
    </tr>
  </tbody>
</table>
<blockquote><i class="fa-sharp fa-solid fa-lightbulb"></i> 此 meme 受<span class="pn outer"><span class="pn inner">梨咕米</span></span>启发而成。</blockquote><p></p>
<style>
  table.alignment-chart{
    text-align: center;
    width: 100%;
    margin: auto;
    min-width: 648px;
    overflow-x: scroll;
  }
  table.alignment-chart img {
    max-width: 120px;
    max-height: 100px;
    margin: auto;
  }
  table.alignment-chart td {
    padding: 6px;
  }
  table.alignment-chart td,
  table.alignment-chart th {
    width: 25%;
  }
  th.h > div {
    font-weight: 400;
    font-size: 100%;
  }
  .h {
    font-weight: 700;
    font-size: 115%;
  }
  td > div.cat {
    font-weight: 600;
    font-size: 120%;
  }
  .pn.inner {
    margin: 0 0em;
  }
  .pn.outer {
    border-bottom: 1px solid;
    margin: 0 1px;
  }
</style>
