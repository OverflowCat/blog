---
title: 下载 Chrome 开发者工具「网络」面板中的文件
description: Chrome 开发者工具的「网络」面板可以查看所有的网络请求。讨厌的是，Chrome 没有提供在列表内直接下载对应的响应的功能。
date: 2022-12-26 13:47:52
categories: 页面仔的自我修养
tags: Chrome
layout: "@/layouts/Default.astro"
---

Chrome 开发者工具的「网络」面板可以查看所有的网络请求。`fetch` 发送的请求不会出现在「源代码」面板中，只能通过「网络」里下载。讨厌的是，Chrome 没有提供在列表内直接下载对应的响应的功能，双击对应的请求仍然只会在新标签页重新发送请求，而不是下载已抓取的资源。若远程服务器上的资源已失效，则无法成功下载。虽然可以直接通过「响应」查看内容，但若请求是 binary，则可能包含非法的 Unicode 位点，无法通过复制粘贴将内容正确地保存到本地。

此时，可以通过右键任意一请求，点选菜单最下方「以 HAR 格式保存所有内容」或点击如下所示的下载按钮保存 HAR。

![保存 HAR](https://user-images.githubusercontent.com/20166026/209518112-363973c9-ccca-412c-889c-05f6b530bf01.png)

HAR 实质是 JSON。通过文本编辑器打开下载的 HAR 文件，依据「标头」-「响应标头」中的 `Content-Length` 查找到对应的请求内容，即可在 `content > text` 中看到 Base64 编码的 response 内容。

![](https://user-images.githubusercontent.com/20166026/209519101-4785d3ec-3d06-476f-849e-1afb31384a18.png)

此时我们可以安心地将内容复制出来，解码即可。推荐使用命令行工具。

```python
import base64
from codecs import open

with open("b64.txt", "r") as f:
    content = base64.b64decode(f.read())
print(content)

with open("out.txt", "wb") as f:
    f.write(content)
```

注意若用 Python 处理，写入文件的内容不一定是合法字符串，故 `open` 的参数需要为 `wb`，否则会有 `TypeError: write() argument must be str, not bytes`。