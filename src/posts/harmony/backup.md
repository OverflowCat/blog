---
title: 惊鸿一瞥：升级、回退、云备份
date: 2025-09-06T00:49:34.266Z
desc: 数据无价，谨慎操作。
photo:
  src: "https://remnote-user-data.s3.amazonaws.com/m4BioXFTNr6AqGoQClj30gND8blcVU6Kp8nys2QkCGAHlsfHwpAjsE4cX96uZg6k3eEUQQmp_Sl_hxdzTXYgQhP28KK_dUpTumi7k7B7tSjKho114auHbyc-gXGxM1ne.jpeg"
  aspect: "532:400"
  # hide: true
noscript: true
licence: false
ext: md
series: harmony
vert: false
hant: false
layout: "@/layouts/Default.astro"
tags:
  - 鸿蒙
categories:
  - 惊鸿一瞥
---

> 数据无价，谨慎操作。

绿色部分为推荐的操作；蓝色部分为我没有仔细观察，可能有风险的操作；红色部分为无法后悔的操作。本文仅为参考，请对自己的数据负责。

## 升级

<img class="float-end" src="https://remnote-user-data.s3.amazonaws.com/Vn1JQfwO7Wb7sZRIBPoR5gtueb1muWqqHcxUB1BAk4LuYpL3Pv5LQV-EwqfkoDGwXUxWKLlcWucF_FWzvh3thD8FroE5DiLgyHmRd-W0jVHQ8gXUDPCuZ8gbIGM-lnPx.jpeg" width="286" height="647" />

- 简而言之：升级前务必备份数据到本机，回退时才能恢复这部分数据。
- 从杂种鸿蒙升级到纯血鸿蒙，应用数据的保留是通过[应用数据迁移](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V14/app-data-migration-overview-V14)实现，具体来说，是升级时 APK 沙箱数据前会被放到中间目录，然后 NEXT 调用 HAP 的 `BackupExtensionAbility` 处理数
据，保存到鸿蒙应用的沙箱。

![](https://remnote-user-data.s3.amazonaws.com/MfB6beE3-entfolr1IFBFkveMM32Wio7Momq6Hz3eS2yVyuIdj63sxPfYADpEZLwuwITbiKDcgZEy-VJfRSpEtaoD-SmJz5ZMvUsotdjjJbej1XdBdcI4NmGW2xCs9Y6.png)

- 升级前会有一个强制你<span class="mark" remnotemark="true" style="color: green;">备份</span>的流程。这是唯一允许备份数据到本机的地方。
  - 然而，安卓应用有一清单值。至少在 2024 年，如果禁止备份，则降级恢复时只能恢复应用本体。
  - 不过，对于微信，似乎各大厂商都覆盖了这一限制。尚不清楚目前是否已解除这一限制。
- 安卓出境易中的应用和数据并不会继承到鸿蒙出境易中。
- 出境易和卓易通可以有相同应用。
- 如果不想你的应用被升级到鸿蒙原生版本或受到出境易、卓易通的（主要是升级）限制，那可以事先<span class="mark" remnotemark="true" style="color: green;">安装 GBox</span> 等容器应用。GBox
  中的应用数据会在恢复备份或者升级后保留。
- 升级之后，微信需要有一个导入旧聊天记录的功能，需要一定时间。如果你还想在近期内回退，那么建议你<span class="mark" remnotemark="true" style="color: green;">暂缓导入</span>。这样，想回退时将消息迁移到其他设备就会只包含新增的消息。

## 回退

根据[鸿蒙设备司法鉴定技术指南：四大调试工具的取证实践 - 安全内参 | 决策者的网络安全知识库](https://www.secrss.com/articles/81997)：

> 然而，鸿蒙系统的分布式架构和日志加密机制，让传统取证面临设备连接难、日志解析难、证据固定难等多重挑战。在此背景下，华为面向开发者发布的 HDC（HarmonyOS
> Device Connector）工具、aa 工具（Ability 助手，简称 aa）、bm 工具（Bundle
> Manager 包管理工具，简称 bm）与 hilog 工具，成为司法鉴定领域的“破壁利器”，为司法实践提供技术支撑，帮助鉴定人员在纯血鸿蒙设备上实现高效、可靠的电子证据提取与分析。

实际其他的在备份上没有太大用处，目前支持鸿蒙 NEXT 较好的取证软件似乎就是模拟了以下 HiSuite 备份流程的实现。

### HiSuite

据[官网](https://consumer.huawei.com/cn/support/hisuite/)，支持以下内容：

> - 联系人、信息、通话记录、备忘录、录音、日程、图片、视频、音乐、文档
> - 三方应用及数据：受限于系统和应用兼容性，仅支持部分应用和数据迁移（升级尝鲜类应用暂不支持）
> - 系统设置：桌面布局、天气、闹钟等部分设置项（暂不支持隐私空间）
> - 为避免数据丢失，建议 QQ、微信等三方软件使用三方应用自带的迁移功能进行迁移备份，并确认备份内容完整有效

![HiSuite 备份界面](https://remnote-user-data.s3.amazonaws.com/PAGa14l9vDcskw-cd_kZTCHkzP2a40s7X-w89g86MUYBOWm3DgDzXiGvRmoECNBcfnbqKYGtbHkg4YUTJMDN8HtGQWQ1pdmJXzLL9ewVy8nHVjxfjVM4wsYo8ABWrjuP.png)

讽刺的是，使用鸿蒙 PC 的用户，和 macOS 用户一样，反而没有支持鸿蒙 5 的 HiSuite。

另外，官网上还有一节 **HarmonyOS 5 版本的备份记录在 HarmonyOS 4.2/HarmonyOS 4.3 版本恢复**：
- 支持：
  - 联系人、短信（文本信息）
  - 日程、备忘录、笔记
  - 文档、音乐、录音（含通话录音）、图片、视频。
  - 通话记录（备份时 ≥5.0.0.115）
- 不支持：
  - 彩信、5G 消息
  - 图库（回收站）、我的收藏
  - 三方应用及数据
  - 系统设置、隐私空间等
  - 文件保密柜数据（请在备份前将文件保密柜数据移出）

### 将数据备份至云空间

- [中国人愿用隐私换便利。](https://economy.caixin.com/2018-03-26/101226645.html)不开通会员时，<span class="mark" remnotemark="true" style="color: green;">登录云空间</span>会每日备份基础数据，包含短信、通话记录、联系人。但尚不清楚是否后续的备份会覆盖前面的备份。
- 如果你开通了会员：从云空间恢复应用数据时，会<span class="mark" remnotemark="true" style="color: red;">覆盖</span>掉本机上的应用数据。因此，仅推荐你用来备份图库。另，在纯血鸿蒙上开通可能会有不定优惠，以及 Petal One 套餐优惠（可视为华为服务的大会员）。

### 如何导出媒体数据

#### 使用 `hdc`

[“答开发者问”之 HarmonyOS 技术问题解析 第 15 期](https://archive.vn/MrFBj)（[IA](https://web.archive.org/web/20250905232821/https://developer.huawei.com/consumer/cn/forum/topic/0207185816113212004?fid=0109140870620153026)）中：
  - > **问题五：HarmonyOS NEXT 手机怎么导出照片到电脑？**<br/>目前在 mate60 pro 拍摄的照片需要导出到电脑，请问要如何操作？
  - > <a
    > href="https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mediatool"
    > data-isinlinelink="true">mediatool</a>
    > 是一个轻量级的命令行工具集合，开发者可通过此工具操作媒体库资源。媒体库为图库提供和管理数据，媒体库中的图片视频会在图库界面呈现。
  - 然而这个工具十分不好用，并不是 mv
    那种能做各种文件操作的。建议只使用 `mediatool recv all dest`
    进行全量导出。如果想增量的话，需要自己用 `mediatool ls -l /storage/media/local/files/Photo` 拉出文件列表然后写脚本。

#### 使用其他软件

- 安卓上的备份软件自不必说。但 NEXT 上的却寥寥无几。
- 最早用上访问全部图片权限的是百度网盘，again，如果你愿意用你的隐私换你和艳红的便利。
- 流舟文件支持 WebDav 和 FTP，但其 OneDrive 支持有 bug，至少我的 1drv Business 会报无法创建目录。

## 克隆

<img class="float-end" src="https://remnote-user-data.s3.amazonaws.com/gHkn816t2n29S822UqPwuvVJ4RnJvx4oozCO2G1EmIpsEOu0lofV4Ocm45hCbIZgVPuIFcz5K8b9NT8MMDbs7KIa3xGeXyir12nQ99kxGbXTjbnj9-DOjA5PkRdWFS-p.webp" width="326" height="705" />

- 如果你像我一样，有两台同类型设备处在纯血鸿蒙，那么可以通过<span class="mark" remnotemark="true" style="color: green;">数据克隆</span>来在手机间拷贝应用数据，相对比较方便快捷。这也是唯一不太需要其他系统设备的备份纯血鸿蒙的方法。
  - 由于我没有相关设备，尚不知道能否跨设备类型迁移（手机、平板以及
    2in1）。
- <span class="mark" remnotemark="true" style="color: red;">克隆应用</span>时，部分应用可迁移数据，会用旧机数据<span class="mark"
  remnotemark="true"
  style="color: red;">覆盖</span>新机上的应用数据。
- <span class="mark" remnotemark="true" style="color: orange;">克隆桌面布局</span>时，会用旧机数据覆盖新机上的桌面布局。由于鸿蒙 4+完全无法使用第三方桌面，重新摆放图标是很困难的。
