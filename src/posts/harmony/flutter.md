---
title: 在鸿蒙上运行 Flutter
# date: 2026-03-12T09:19:09.690Z
date: "2026-03-16T09:52:58.704Z"
photo:
  src: https://remnote-user-data.s3.amazonaws.com/w1UBINtz0Ex4opzd6p3O_aPdnSYqeyFK8dKvXloJg6dgr6AFtGAtHB7C9eHg5poAyCs75TSzOeKzzo8qGefkpBXuJ43Efmnh2TihkSOC3ry6IhdMPzO-mJlU37l8ivNT.jpeg
noscript: true
licence: false
layout: "@/layouts/Default.astro"
# series: harmony
tags:
  - Flutter
ext: md
math: mathjax
---

## 配置 HarmonyOS SDK

本次安装在鸿蒙电脑的 Windows 迫真机上，即 Windows on ARM。GitCode 上给出了 macOS 的 instructions：

> * API18, deveco-studio-5.1 或 command-line-tools-5.1 (推荐使用5.1.0 Beta1或更新版本)
我安装了 DevEco Studio 6.0。
> * 配置 Java17
实测不需要。
> * 配置环境变量 (SDK, node, ohpm, hvigor)
> ```sh
> export TOOL_HOME=/Applications/DevEco-Studio.app/Contents # mac环境
> export DEVECO_SDK_HOME=$TOOL_HOME/sdk # command-line-tools/sdk
> export PATH=$TOOL_HOME/tools/ohpm/bin:$PATH # command-line-tools/ohpm/bin
> export PATH=$TOOL_HOME/tools/hvigor/bin:$PATH # command-line-tools/hvigor/bin
> export PATH=$TOOL_HOME/tools/node/bin:$PATH # command-line-tools/tool/node/bin
> ```

但是，注意这个 `sdk` 不是你在 DevEco Studio 里手动下载的 ……，而是 DevEco 自带的。在 Windows 上，你可以使用下面的：

```pwsh
$env:TOOL_HOME = "C:\Program Files\Huawei\DevEco Studio"
$env:DEVECO_SDK_HOME = $env:TOOL_HOME + "\sdk"
$env:PATH = "$env:TOOL_HOME\tools\ohpm\bin;$env:PATH"
$env:PATH = "$env:TOOL_HOME\tools\hvigor\bin;$env:PATH"
$env:PATH = "$env:TOOL_HOME\tools\node\bin;$env:PATH"
```

## Flutter 仓

> `git clone https://gitcode.com/openharmony-sig/flutter_flutter.git`

Flutter 官方说 build 时 Flutter version 靠的是 git 上的 tag，不能 shallow clone。如果你这么做了，请 `git pull --unshallow{:sh}`，将浅克隆（depth $<$ infinite）转为完整克隆，拉取所有历史记录。

你可以参照我设置的环境变量：

```sh
# 依赖的缓存
$env:PUB_CACHE = "C:\Users\HongYunVM\Documents\temp\PUB"

# 拉取下来的 flutter_flutter/bin 目录
$env:PATH = "C:\Users\HongYunVM\Documents\flutter\bin;$env:PATH"

# 国内镜像
$env:PUB_HOSTED_URL = "https://pub.flutter-io.cn"
$env:FLUTTER_STORAGE_BASE_URL = "https://storage.flutter-io.cn"

# 鸿蒙化适配的 Flutter repo URL，这个官方文档上没设置
$env:FLUTTER_GIT_URL = "https://gitcode.com/openharmony-tpc/flutter_flutter.git"
```

## 构建 SDK

> 运行 `flutter doctor -v` 检查环境变量配置是否正确，**Futter** 与 **OpenHarmony**
> 应都为 ok 标识，若两处提示缺少环境，按提示补上相应环境即可。

仍然卡在了 flutter_flutter 出来的 SDK 的 version 是 0.0.0-unknown 导致 pub 没法正常 resolve deps。

尝试修改 Flutter 对于版本判断部分的代码，但还会在 pub resolve 依赖时卡住，即 pub 还会再次读取版本号。

解决方法是此时在已有 build cache 的情况下，编辑 `bin\cache\flutter.version.json`，将 ``frameworkVersion`` 和 ``flutterVersion`` 手动改为 `"3.32.4"{:js}`。

```json diff
  {
-   "frameworkVersion": "0.0.0",
+   "frameworkVersion": "3.32.4",
    "channel": "[user-branch]",
    "repositoryUrl": "https://gitcode.com/openharmony-tpc/flutter_flutter.git",
    "frameworkRevision": "7c7de913d9ccbed777e06dc32dfe1056d495dd56",
    "frameworkCommitDate": "2026-02-13 09:56:53 +0800",
    "engineRevision": "8cd19e509d6bece8ccd74aef027c4ca947363095",
    "engineCommitDate": "1970-01-01 08:00:00.000",
    "dartSdkVersion": "3.9.2",
    "devToolsVersion": "2.45.1",
-   "flutterVersion": "0.0.0"
+   "flutterVersion": "3.32.4"
  }
```

## 创建工程

> 创建工程与编译命令，编译产物在\<projectName\>/ohos/entry/build/default/outputs/default/entry-default-signed.hap下。
>
> ```pwsh
> # 创建工程
> flutter create --platforms ohos <projectName>
> 
> # 进入工程根目录编译
> # 示例：flutter build hap [--target-platform ohos-arm64] [--local-engine=<DIR>/src/out/ohos_release_arm64] --release
> flutter build hap --target-platform ohos-arm64 --<debug|release|profile> [--local-engine=src/out/<engine产物目录> --local-engine-host=src/out/<engine host目录>/]
> ```

build 之后应该会提示没有配置签名，打开 DevEco Studio，按照正常鸿蒙应用的调试过程运行即可。

默认的 template 只能在 `phone` target 上运行，需要修改所有 `**/module.json5`（``main/``、``ohosTest/``）：

```json
    "deviceTypes": [
      "phone", "tablet", "2in1"
    ],
```
