---
title: 在鸿蒙上运行 Flutter
date: 2026-03-12T09:19:09.690Z
photo:
noscript: false
licence: false
layout: "@/layouts/Default.astro"
series: harmony
tags:
  - Flutter
ext: md
---


## 配置HarmonyOS SDK和环境变量

本次安装在鸿蒙电脑的 Windows 迫真机上，即 Windows on ARM。

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

注意这个 `sdk` 不是你在 DevEco Studio 里手动下载的 ……，而是 DevEco 自带的。你可以使用下面的：

```pwsh
$env:TOOL_HOME = "C:\Program Files\Huawei\DevEco Studio"
$env:DEVECO_SDK_HOME = $env:TOOL_HOME + "\sdk"
$env:PATH = "$env:TOOL_HOME\tools\ohpm\bin;$env:PATH"
$env:PATH = "$env:TOOL_HOME\tools\hvigor\bin;$env:PATH"
$env:PATH = "$env:TOOL_HOME\tools\node\bin;$env:PATH"
```

> `git clone https://gitcode.com/openharmony-sig/flutter_flutter.git`

Flutter 官方说 build 时 Flutter version 靠的是 git 上的 tag，不能 shallow clone。如果你这么做了，请 ``。

     ```sh
      export PUB_CACHE=D:/PUB
      export PATH=<flutter_flutter path>/bin:$PATH
      export PUB_HOSTED_URL=https://pub.flutter-io.cn
      export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
     ```

   1. 应用构建依赖flutter engine构建产物与engine host，默认从云端获取。
   <!-- 也可以手工指定
      - 使用示例：`--local-engine=src/out/<engine产物目录> --local-engine-host=src/our/<host产物目录>`
      均在 `src/out` 路径下。不同构建类型的产物分别在 `ohos_debug_unopt_arm64`、 `ohos_release_arm64` 和 `ohos_profile_arm64` 目录下。engine host 的构建类型也有三种，分别在 `host_debug_unopt` 、`host_release` 与 `host_profile` 目录中。构建需要根据不同的构建类型来指定不同的目录。 -->

      ```sh
       #依赖缓存
       export PUB_CACHE=D:/PUB(自定义路径)

       # 国内镜像
       export PUB_HOSTED_URL=https://pub.flutter-io.cn
       export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

       # 拉取下来的flutter_flutter/bin目录
       export PATH=/home/<user>/ohos/flutter_flutter/bin:$PATH

       # HamonyOS SDK
       export TOOL_HOME=/Applications/DevEco-Studio.app/Contents # mac环境
       export DEVECO_SDK_HOME=$TOOL_HOME/sdk # command-line-tools/sdk
       export PATH=$TOOL_HOME/tools/ohpm/bin:$PATH # command-line-tools/ohpm/bin
       export PATH=$TOOL_HOME/tools/hvigor/bin:$PATH # command-line-tools/hvigor/bin
       export PATH=$TOOL_HOME/tools/node/bin:$PATH # command-line-tools/tool/node/bin
      ```

## 构建步骤

> 运行 `flutter doctor -v` 检查环境变量配置是否正确，**Futter**与**OpenHarmony**应都为ok标识，若两处提示缺少环境，按提示补上相应环境即可。

仍然卡在了 flutter_flutter 出来的 SDK 的 version 是 0.0.0-unknown 导致 pub 没法正常 resolve deps。

> 创建工程与编译命令，编译产物在\<projectName\>/ohos/entry/build/default/outputs/default/entry-default-signed.hap下。

   ```
    # 创建工程
    flutter create --platforms ohos <projectName>

   # 进入工程根目录编译
   # 示例：flutter build hap [--target-platform ohos-arm64] [--local-engine=<DIR>/src/out/ohos_release_arm64] --release
   flutter build hap --target-platform ohos-arm64 --<debug|release|profile> [--local-engine=src/out/<engine产物目录> --local-engine-host=src/out/<engine host目录>/]
   ```

1. 通过`flutter devices`指令发现ohos设备之后，使用 `hdc -t <deviceId> install <hap file path>`进行安装。

2. 也可直接使用下列指令运行：
```
   flutter run --debug [--local-engine=<DIR>/src/out/ohos_debug_unopt_arm64] [--local-engine-host=<DIR>/src/out/host_debug_unopt] -d <device-id>
```

1. 构建app包命令：

```
# 示例：flutter build app --release [--local-engine=<DIR>/src/out/ohos_release_arm64] [--local-engine-host=<DIR>/src/out/host_release]
flutter build app --release
```
