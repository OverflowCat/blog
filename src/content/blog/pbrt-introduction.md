---
title: PBRT 笔记：1. 绪论
date: 2023-01-15 03:33:40
tags: 光线追踪
categories: 读书笔记
mathjax: true
layout: "@/layouts/Default.astro"
noscript: true
---

![](https://user-images.githubusercontent.com/20166026/212490756-206ba1cd-4ef7-4a25-90fe-502279a37ddf.png)

本文为《基于物理的渲染：从理论到实现》第三版第一章的笔记．此书通过结合具体的软件（pbrt）代码，讲解光线追踪的实现．

# 相关资源

本书的 [官方网站](https://www.pbrt.org/)．你可以在 [这里](https://www.pbr-book.org/) 免费阅读第三版（英文），或者在 [这里](https://github.com/kanition/pbrtbook) 免费下载第三版（中文）的 PDF（目前翻译进度到第八章）．你也可以购买清华大学出版社翻译的《物理渲染：从理论到实现（第二版）》纸质书（ISBN `9787302449812`），不过价格不菲．

`pbrt-v3` 是原书作者的 C++ 实现，代码在 [GitHub](https://github.com/mmp/pbrt-v3)．

`rs_pbrt` 是一个 Rust 的 pbrt-v3 实现，不过目前还有多处待完成，缺少一些功能．不过 Rust 有统一的构建环境和更好的开发体验．你可以看看其 [GitHub 仓库](https://github.com/wahn/rs_pbrt) 和 [网站](https://www.rs-pbrt.org/)．

本文末尾附有简明的编译和使用教程．

# 第一章：绪论

**渲染**（rendering）是由 3D **场景**（scene）描述生成图像的过程．**基于物理的**（physically based）渲染运用物理学规律对光与物质的相互作用建模．

长期以来，**实时**（real-time）渲染主要采用**栅格化**（rasterization）或栅格化+**光线追踪**（ray-tracing），而本书中完全采用光线追踪．

## 1.1 文学编程

讲解书中伪代码的表示方法**文学编程**（literate programming）．

不认可这种表示方法，即便想法很好——作为教学用的代码不能过长，但是这样代码支离破碎．为了便于理解，应该提供更小更快、能即时查看到效果的教科书．官方的电子版很好，可以展开折叠的代码，而不是在页内跳来跳去．

Jupyter Notebook 应是一个更好的 literate programming．

## 1.2 逼真渲染和光线追踪算法

### 1.2.1 相机

针孔相机也可以看作是把胶片平面放置在针孔的前方但距离不变——出于仿真目的，可以将胶片放在**视见体**（viewing volume）位置．视见体、小孔、胶片构成一个双锥体．

incident light 是「入射光」的意思．

### 1.2.2 光线-物体相交

#### 交点信息

将射线 $\boldsymbol{r}$ 写成参数形式：

$${\boldsymbol r}(t)={\boldsymbol o}+t{\boldsymbol d},$$

其中 ${\boldsymbol o}$ 是射线端点， ${\boldsymbol d}$ 是其方向向量， $t$ 是定义在 $(0,\infty)$ 的参数．

由隐函数 $F(x,y,z)=0$ 定义曲面．将曲面的隐式方程代入射线方程即可求得交点．如果没有正根，则射线与球面错开了；如果有，则最小正根给出了交点．

#### 该点的特定属性

除交点外，光线追踪器还需知道如曲面法线 $\boldsymbol n$ 等额外信息以**着色**（shade）．

#### 加速结构

**加速结构**（acceleration structure）可使时间复杂度降为 $O(I\log N)$ ，其中 $I$ 是图像像素数目， $N$ 是场景中物体的数量．

### 1.2.3 光的分布

围绕光源的单位球面在单位面积上的功率为 $\displaystyle\frac{\varPhi}{4\mathrm{\pi}}$ ．

到达半径为 $r$ 的球面上一点的单位面积功率 $\propto\dfrac{1}{r^2}$ ．

光源若与法线有夹角， $\mathrm dA$ 上积累的功率 $\propto\cos\theta$ ．

综上所述，单位面积上的**辐射照度**（differential irradiance） $\mathrm{d}E$ 为

$$\mathrm{d}E=\frac{\varPhi\cos\theta}{4\mathrm{\pi}r^2}.$$

### 1.2.4 可见性

若有阴影遮挡着色点，光源路径不畅通时不会照亮该点．通过 **阴影射线**（shadow ray）可判断是否可见．方法是 简单构造一条新射线，其端点是表面上的点，方向指向光源，如下图中虚线所示．

![递归式的光线追踪](https://user-images.githubusercontent.com/20166026/212490274-ddae7a7e-2e5c-4088-b337-cff00ea9808d.svg)

> 图片来源为 闫令琪．**[GAMES101: 现代计算机图形学入门](https://sites.cs.ucsb.edu/~lingqi/teaching/games101.html)**．Lecture 13 [光线追踪（基本原理）[pdf]](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_13.pdf)

### 1.2.5 表面散射

为着色我们还需确定入射光如何**被散射**（scattered）．物体的材质由**双向反射分布函数**（bidirectional reflectance distribution function，**BRDF**）描述．该函数告诉我们从**入射**（incoming）方向 ${\boldsymbol \omega}_\mathrm{i}$ 到**出射**（outgoing）方向 ${\boldsymbol \omega}_\mathrm o$ 会反射多少能量．

我们把 $\boldsymbol p$ 处的 BRDF 写作 $f_{\mathrm{r}}({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o},{\boldsymbol \omega}_\mathrm{i})$ ．

### 1.2.6 间接光传输

从物体上一点到达相机的光量由物体的发光量（如果它自己就是光源）与反射光量之和决定．它被形式化为**光传输方程**（light transport equation），表示从点 $\boldsymbol p$ 沿方向 ${\boldsymbol \omega}_\mathrm{o}$ 的出射辐亮度 $L_{\mathrm{o}}({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o})$ 等于该点沿该方向的发光亮度加上点 $\boldsymbol p$ 的邻域球面 $S^2$ 所有方向上经 BSDF $f({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o},{\boldsymbol \omega}_\mathrm{i})$ 和余弦项调制的入射亮度：

$$L_{\mathrm o}({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o})=L_{\mathrm e}({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o})+\int_{S^2}f({\boldsymbol p},{\boldsymbol \omega}_\mathrm{o},{\boldsymbol \omega}_\mathrm{i})L_{\mathrm i}({\boldsymbol p},{\boldsymbol \omega}_\mathrm{i})|\cos{\theta_{\mathrm i} }| \,\mathrm{d}{\boldsymbol \omega}_\mathrm{i}$$

Whitted 算法把积分变为少量方向上的求和，故可以扩展到实现镜面和玻璃外的更多效果．

### 1.2.7 光线传播

在非真空中存在如烟、雾、尘等**介质**（participating media）．

#### 熄灭（衰减）

介质可以通过吸收或沿不同方向散射来**熄灭**（extinguish）aka. **衰减**（attenuate）光．

需要计算射线与交点之间的**透射率**（transmittance） $T$ ．

#### 增强

介质也可以沿路线增强光．在介质发光（例如火焰）或从其他方向把光散射回该射线时可发生该现象．

可以通过数值计算**体积光传输方程**（volume light transport equation）来寻求该量，该方法还能计算光传输方程求得从表面反射回的光量．

## 1.3 pbrt：系统概述

### 1.3.1 执行阶段

pbrt 在概念上可分为两个执行阶段．

首先解析场景描述文件， 最终结果 是 `Scene` 和 `Integrator` 的实例，后者实现了渲染前者的算法，被称为积分器主要是计算 1.2.6 节中式的积分．

然后执行渲染主循环，由 `Integrator::Render()` 执行．

### 1.3.2 场景表示

程序首先解析命令行参数并 parse 场景描述文件，`rs_pbrt` 的这部分代码在 `rs_pbrt` 的 `parse_file` 中．然后 就创建表示场景中光源和几何图元的对象．这两者都储存在 `Scene` 对象中．

``` rust
pub struct Scene {
    pub lights: Vec<Arc<Light>>,
    pub infinite_lights: Vec<Arc<Light>>,
    pub aggregate: Arc<Primitive>,
    pub world_bound: Bounds3f,
}
```

C++ 的 `shared_ptr` 对应的就是 `Arc`：

> A thread-safe reference-counting pointer. 'Arc' stands for 'Atomically Reference Counted'.

#### 光源

场景中每个光源都由Light对象表示，指定灯光的形状和发射能量的分布．

#### 几何对象

场景中每个几何对象都由Primitive表示，由几何结构 `Shape` 和外观描述 `Material` 组成．他们都储存在 Primitive 中：
``` rust
pub enum Primitive {
    Geometric(Box<GeometricPrimitive>),
    Transformed(Box<TransformedPrimitive>),
    BVH(Box<BVHAccel>),
    KdTree(Box<KdTreeAccel>),
}
```

这个聚合体是一种特殊的图元，它自己持有许多对其他图元的引用．聚合体的实现用加速的数据结构存储了所有场景图元，减少对远离给定光线的图元做不必要的光线相交测试量．

### 1.3.3 积分器接口与采样积分器

**积分器**（integrator）用于计算场景照明的一组测量值．`Integrator` 提供 `render()` 方法，接收一个 `&Scene`．其中一种实现是`SamplerIntegrator`，它是由来自 `Sampler` 的**样本**（sample）流驱动的，每个样本标识了图像上的一点，用于计算到达该点以构成图像的光量．

采样器的实现会极大影响系统生成图像的质量．它责选取光线要追踪的图像平面上的点，并且提供 1.2.6 节公式中所需的采样位置．

### 1.3.4 主渲染循环

![流程示意图](https://user-images.githubusercontent.com/20166026/212491991-3ba3c837-aa92-41b7-b941-69e49cd64865.svg)

为了并行化，图像会被分成图块，每个图块可并行独立处理．pbrt 固定使用 $16 \times 16$ 的图块，这个**粒度**（granularity）对绝大多数图像都适用．

(C++) `Li()` 需要为每次辐亮度计算临时分配少量内存，所以我们会用一个 `MemoryArena` 实例管理内存池以启用比标准库例程更高性能的分配．

### 1.3.5 Whitted 光线追踪积分器

Whitted 积分器工作时递归地计算沿反射和折射光线方向的辐亮度．还是刚才这张图：

![递归式的光线追踪](https://user-images.githubusercontent.com/20166026/212490274-ddae7a7e-2e5c-4088-b337-cff00ea9808d.svg)

对于每个光源，积分器调用方法 `Light::sample_li()`计算从该光源落到表面上待着色点的辐亮度．

## 1.4 pbrt 的并行化

当执行多线程访问共享可改数据时它们必须以某种方式 **同步**（synchronize）其访问，即为**互斥**（mutual exclusion）和**原子操作**（atomic operation）．

### 互斥

pbrt 采用 `std::mutex` 对象实现互斥．至于 C++ 中使用 mutex 的方法，需要声明一个值和一个 mutex，修改值时创建一个 `std::lock_guard<std::mutex>`，该锁会在 drop 时自动释放．cppreference.com [给出了](https://en.cppreference.com/w/cpp/thread/lock_guard#Example) 简明的例子，我将其贴在下方：

``` cpp
#include <thread>
#include <mutex>
#include <iostream>

int g_i = 0;
std::mutex g_i_mutex;  // protects g_i

void safe_increment()
{
    const std::lock_guard<std::mutex> lock(g_i_mutex);
    ++g_i;
    std::cout << "g_i: " << g_i << "; in thread #"
              << std::this_thread::get_id() << '\n';
    // g_i_mutex is automatically released when lock
    // goes out of scope
}

int main()
{
    std::cout << "g_i: " << g_i << "; in main()\n";

    std::thread t1(safe_increment);
    std::thread t2(safe_increment);

    t1.join();
    t2.join();

    std::cout << "g_i: " << g_i << "; in main()\n";
}
```

### 原子操作

C++ 中使用 `std::atomic` 完成原子操作．简单的例子如下：

``` cpp
std::atomic<int> x(0);
++x;
```

## 1.5 如何继续阅读本书

前面的铺垫也太长了，还是过于详细了……

## 1.6 使用和理解代码

传递 `mullptr` 来表示参数不可用或不该用，此时总是使用指针．

在当下 CPU 架构上最慢的数运算是除法、平方根和三角函数．

## 1.7 基于物理的渲染简史

> 基于物理的蒙特卡罗渲染方法成功用于制作的一大原因是它们最终提高了艺术家们的生产力．通过调整采样次数来快速获取缩略图；采用能量未必守恒的反射模型时反射参数可能需要在每个光照环境下都要调整； 光线追踪计算的阴影质量比栅格化方法好得多．

## 1.8 扩展阅读

无重要内容．

# 编译和运行

书中为 `pbrt-v3` 提供的场景文件在此 [3.7 GB tar.gz 文件](https://pub-49ca6a23a58a46ef9cf5a5b34413a7ba.r2.dev/pbrt-v3-scenes.tar.gz) 中．`images` 里有渲染好的图像．

### 在 Windows 上安装和使用 C++ `pbrt-v3`

``` powershell
scoop install cmake
git clone --recursive "https://github.com/mmp/pbrt-v3/" --depth=1
cd pbrt-v3
mkdir build
cd build
cmake ..
```

若成功，则会有一 `.sln` 文件。用 Visual Studio 打开，构建 `BUILD_ALL`。若编译成功，则会提示

```
30>spectrum.cpp
30>正在生成代码...
30>pbrt_test.vcxproj -> …\pbrt-v3\build\Release\pbrt_test.exe
30>已完成生成项目“pbrt_test.vcxproj”的操作．
34>------ 已启动生成: 项目: ALL_BUILD, 配置: Release x64 ------
34>Building Custom Rule …/pbrt-v3/CMakeLists.txt
========== “生成”: 34 成功，0 失败，0 更新，0 已跳过 ==========
```

可以在 `build` 目录下的 `Release`（或 `Debug`）文件夹中找到 `pbrt.exe`．

### 使用 `rs_pbrt` 渲染文件

我先 `cargo build -r ` 进行 release build，然后通过
``` sh
E:\code\rs_pbrt\target\release\rs_pbrt.exe "E:\downloads\pbrt-v3-scenes\killeroos\killeroo-simple.pbrt"
```

绝对路径使用会报错．其原因是 `.pbrt` 文件中有 `Include` 语句，在 `Include "geometry/killeroo.pbrt"` 时遇到相对路径，拼接的 parent 目录为 `env::current_dir()`．`cd` 到 `pbrt-v3-scenes/killeroos/`，参数填写绝对路径依然会有路径拼接错误．解决方法是填写相对路径．

``` sh
❯ E:\downloads\pbrt-v3-scenes\killeroos> E:\code\rs_pbrt\target\release\rs_pbrt.exe "killeroo-simple.pbrt"
pbrt version 0.9.8 (unknown) [Detected 24 cores]
Copyright (c) 2016-2022 Jan Douglas Bert Walter.
Rust code based on C++ code by Matt Pharr, Greg Humphreys, and Wenzel Jakob.
opening file FILE = killeroo-simple.pbrt
Film "image"
"string filename" ["killeroo-simple.exr"]
"integer xresolution" [700]
"integer yresolution" [700]
Sampler "sobol"
"integer pixelsamples" [64]
Integrator "directlighting"
Include "E:\\downloads\\pbrt-v3-scenes\\killeroos\\geometry/killeroo.pbrt"
opening file FILE = E:\downloads\pbrt-v3-scenes\killeroos\geometry/killeroo.pbrt
Include "E:\\downloads\\pbrt-v3-scenes\\killeroos\\geometry/killeroo.pbrt"
opening file FILE = E:\downloads\pbrt-v3-scenes\killeroos\geometry/killeroo.pbrt
Integrator "directlighting"
Rendering with 24 thread(s) ...
1936 / 1936 [======================================================================================================================================] 100.00 % 14.81/s
Writing image "pbrt.png" with bounds Bounds2i { p_min: Point2i { x: 0, y: 0 }, p_max: Point2i { x: 700, y: 700 } } 26.76 % 36.11/s 39s
```

渲染的图片在当前工作目录下．

![渲染图 pbrt.png](https://user-images.githubusercontent.com/20166026/211073342-7fc95879-c72a-470a-ba17-b666a3e687c9.png)
