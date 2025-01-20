---
title: 小程序平台一览
date: 2025-01-20T17:39:43.688Z
photo:
  src: "/og/mini-apps.png"
  alt: 小程序平台一览
  hide: true
noscript: true
licence: CcBySa
description: 仙之人兮列如麻。
layout: "@/layouts/Default.astro"
ext: md
tags: 小程序
categories: "页面仔的自我修养"
---

<style>
article#post .table-container {
  overflow-x: auto;
  min-width: 450px;
  max-width: 950px;
  margin: auto;
}

.table-container table {
  margin: 0!important;
  width: 97%;
}

table a {
  transition: color 0.3s ease 0s, background-color 0.3s ease 0s;
  border-block-end: solid 2px;
  border-block-end-color: var(--text-color)!important;
  padding: 2px;
  cursor: pointer;
}

table a:hover {
  color: var(--bg-color)!important;
  background-color: var(--text-color);
  border-block-end: solid transparent 2px;
}
</style>

<section class="table-container">
<table>
  <tbody>
    <tr>
      <th colspan="2">平台</th>
      <th>名称</th>
      <th>内容和模板</th>
      <th>布局和样式</th>
      <th>交互和动作</th>
    </tr>
    <tr>
      <td colspan="2">Web</td>
      <td><a href="https://web.dev/articles/mini-apps/mini-app-what-are-h5-and-quickapp">H5</a></td>
      <td>HTML</td>
      <td>CSS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2" class="text-[#27a343]">微信</td>
      <td><a href="https://zh.wikipedia.org/zh-cn/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F">微信小程序</a></td>
      <td><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/">WXML</a></td>
      <td><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html">WXSS</a></td>
      <td><a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/">WXS</a></td>
    </tr>
    <tr>
      <td colspan="2" class="text-orange">淘宝</td>
      <td><a href="https://miniapp.open.taobao.com/docV3.htm?docId=119115&amp;docType=1&amp;source=search">淘宝小程序</a></td>
      <td rowspan="2"><a href="https://opendocs.alipay.com/mini/framework/axml?pathHash=d3eafd67">AXML</a></td>
      <td rowspan="2"><a href="https://opendocs.alipay.com/mini/framework/acss?pathHash=7e02ff0d">ACSS</a></td>
      <td rowspan="2"><a href="https://opendocs.alipay.com/mini/framework/sjs">SJS</a> (Safe/Subset JavaScript)</td>
    </tr>
    <tr>
      <td colspan="2" class="text-blue-5">支付宝</td>
      <td><a href="https://opendocs.alipay.com/mini">支付宝小程序</a></td>
    </tr>
    <tr>
      <td rowspan="4">字节跳动</td>
      <td><a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview">抖音、抖音极速版</a></td>
      <td><a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/usage-guide">抖音小程序</a></td>
      <td rowspan="3"><a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/tutorial/miniapp-framework/introduction">TTML</a></td>
      <td rowspan="3"><a href="https://open.feishu.cn/document/client-docs/gadget/framework/ui-layer/ttss">TTSS</a></td>
      <td rowspan="3"><a href="https://open.feishu.cn/document/client-docs/gadget/framework/ui-layer/sjs/sjs-introduction">SJS</a> (Safe JavaScript)</td>
    </tr>
    <tr>
      <td><a href="https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview">今日头条、头条极速版</a></td>
      <td>头条小程序</td>
    </tr>
    <tr>
      <td rowspan="2"><a href="https://open.feishu.cn/document/client-docs/intro">飞书</a>、<a href="https://open.larksuite.com/">Lark</a></td>
      <td><a href="https://open.feishu.cn/document/uYjL24iN/uQTM5UjL0ETO14CNxkTN/overview">飞书小程序</a></td>
    </tr>
    <tr>
      <td><a href="https://open.feishu.cn/document/uQjL04CN/uAzM3QjLwMzN04CMzcDN?lang=zh-CN">飞书网页应用</a></td>
      <td>HTML</td>
      <td>CSS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2">UniApp</td>
      <td><a href="https://doc.dcloud.net.cn/uni-app-x/">UniApp X</a></td>
      <td colspan="2"><a href="https://doc.dcloud.net.cn/uni-app-x/#_2-uvue%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E">uvue</a></td>
      <td><a href="https://doc.dcloud.net.cn/uni-app-x/uts/#uts-%E4%BB%8B%E7%BB%8D">UTS</a></td>
    </tr>
    <tr>
      <td colspan="2">百度</td>
      <td><a href="https://smartprogram.baidu.com/developer/index.html">百度智能小程序</a></td>
      <td><a href="https://smartapp.baidu.com/static/miniappdocs/develop/framework/framework/index.html">SWAN</a></td>
      <td><a href="https://smartprogram.baidu.com/docs/develop/framework/view_css/">CSS</a></td>
      <td><a href="https://smartprogram.baidu.com/docs/develop/framework/sjs_start/">SJS</a></td>
    </tr>
    <tr>
      <td colspan="2">360</td>
      <td><a href="https://mp.360.cn/#/">360 小程序</a></td>
      <td><a href="https://mp.360.cn/doc/miniprogram/dev/#/bff0c21642962063d3c9fd81e32cfb87">HTML</a><br />（非标准组件）</td>
      <td><a href="https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380">CSS</a></td>
      <td><a href="https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380">JS</a></td>
    </tr>
    <tr>
      <td colspan="2">美团</td>
      <td>美团小程序</td>
      <td colspan="3" class="text-center">不公开</td>
    </tr>
    <tr>
      <td colspan="2">京东</td>
      <td><a href="https://mp-docs.jd.com/doc/miniapp/dev/reference/-1">京东小程序</a></td>
      <td><a href="https://mp-docs.jd.com/doc/miniapp/dev/framework/2675">JXML</a></td>
      <td><a href="https://mp-docs.jd.com/doc/miniapp/dev/reference/2605#heading-0">JXSS</a></td>
      <td><a href="https://mp-docs.jd.com/doc/miniapp/dev/reference/2606#heading-0">JDS</a></td>
    </tr>
    <tr>
      <td colspan="2" class="text-[#ff3d13]">快手</td>
      <td><a href="https://open.kuaishou.com/">快手小程序</a></td>
      <td><a href="https://open.kuaishou.com/docs/develop/frame/page/dev_ksml.html#import">KSML</a></td>
      <td><a href="https://open.kuaishou.com/docs/develop/frame/page/dev_css.html">CSS</a></td>
      <td><a href="e.html" aria-invalid="true">KS</a></td>
    </tr>
    <tr>
      <td colspan="2" class="text-[##ff2442]">小红书</td>
      <td><a href="https://miniapp.xiaohongshu.com/home">小红书小程序</a></td>
      <td><a href="https://miniapp.xiaohongshu.com/doc/DC870073">XHSML</a></td>
      <td><a href="https://miniapp.xiaohongshu.com/doc/DC560018">CSS</a></td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2">QQ</td>
      <td><a href="https://q.qq.com/wiki/">QQ 小程序</a></td>
      <td><a href="https://q.qq.com/wiki/develop/miniprogram/frame/view/view_qml_all.html">QML</a></td>
      <td><a href="https://q.qq.com/wiki/develop/miniprogram/frame/view/view_qss_all.html">QSS</a></td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2" class="text-pink">哔哩哔哩</td>
      <td><a href="https://miniapp.bilibili.com/small-app-doc/guide/intro/">bilibili小程序</a></td>
      <td colspan="3" class="text-center"><a href="https://miniapp.bilibili.com/small-app-doc/guide/intro/">Vue 2.5.16</a></td>
    </tr>
    <tr>
      <td colspan="2">云闪付</td>
      <td><a href="https://open.unionpay.com/tjweb/solution/detail?solId=52">云闪付小程序</a></td>
      <td><a href="https://opentools.95516.com/applet/#/docs/develop/framework/overview">HTML</a></td>
      <td><a href="https://opentools.95516.com/applet/#/docs/develop/framework/overview">CSS</a></td>
      <td><a href="https://opentools.95516.com/applet/#/docs/develop/framework/overview">JS</a></td>
    </tr>
    <tr>
      <td>快应用联盟</td>
      <td>&nbsp;</td>
      <td><a href="https://www.quickapp.cn/">快应用</a></td>
      <td colspan="3" class="text-center"><a href="https://www.quickapp.cn/document?menu=1,5">UX</a></td>
    </tr>
    <tr>
      <td>小米</td>
      <td>澎湃OS</td>
      <td>Xiaomi HyperOS</td>
      <td>类 HTML 模板</td>
      <td>CSS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td rowspan="4">鸿蒙</td>
      <td rowspan="2"><a href="https://www.openharmony.cn/mainPlay">OpenHarmony</a></td>
      <td rowspan="4">鸿蒙原生应用<br>鸿蒙元服务</td>
      <td><a href="https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/js-framework-syntax-hml-V5">HML</a></td>
      <td>CSS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2" rowspan="2" class="text-center"><a href="https://developer.huawei.com/consumer/cn/arkts/">ArkTS</a></td>
      <td><a href='https://www.harmonyos.com/en/'>eTS</a></td>
    </tr>
    <tr>
      <td rowspan="2"><a href="https://consumer.huawei.com/cn/harmonyos-next/">HarmonyOS NEXT</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://www.tup.com.cn/bookscenter/book_09676601.html">CangjieUI</a></td>
      <td><a href="https://cangjie-lang.cn/">Cangjie</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://telegram.org/">Telegram</a></td>
      <td><a href="https://core.telegram.org/bots/webapps">Telegram Mini Apps</a></td>
      <td>HTML</td>
      <td>CSS</td>
      <td>JS</td>
    </tr>
    <tr>
      <td colspan="2">币安</td>
      <td><a href="https://merchant.binance.com/zh-CN/products/mini-programs">币安小程序</a></td>
      <td><a href="https://developers.binance.com/docs/mini-program/about-mini-program">BXML</a></td>
      <td><a href="https://developers.binance.com/docs/mini-program/framework/overview#file-architecture">BXSS</a></td>
      <td><a href="https://developers.binance.com/docs/zh-CN/mini-program/framework/bns">BNS</a></td>
    </tr>
  </tbody>
</table>
</section>
