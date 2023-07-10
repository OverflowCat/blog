---
title: 第十四届蓝桥杯（Web 应用开发）第二次模拟赛题解
photo: https://user-images.githubusercontent.com/20166026/204100099-c0ce7ec8-8f95-42b2-b39c-e554180f45a6.png
description: 2022 年，我所用的语言被评为全球最烂语言。为什么呢？垃圾框架层出不穷，运行环境千差万别，类型错误数量全网第一。这是事实，无法否认，但开发者们还是蜂拥而来。这语言总会给你一丝希望，vite 也好，next 也罢，但如此近，仿佛触手可及，让人奋不顾身。
date: 2022-11-26 22:32:32
tags:
- 蓝桥杯
categories:
- 页面仔的自我修养
- Selected
# icon: "tabler:building-bridge"
layout: "@/layouts/Default.astro"
---

> 2022 年，我所用的语言被评为全球最烂语言。为什么呢？垃圾框架层出不穷，运行环境千差万别，类型错误数量全网第一。
>
> 这是事实，无法否认，但开发者们还是蜂拥而来。这语言总会给你一丝希望，vite 也好，next 也罢，但如此近，仿佛触手可及，让人奋不顾身。
>
> 这里充斥着网页，而我正是那页面仔！

**代码请移步至 GitHub [OverflowCat/lanqiao-14-web](https://github.com/OverflowCat/lanqiao-14-web)。**

## 凭空消失的 TA

### 题目

> 初始代码中的 `index.html` 在浏览器中并没有显示出来表单组件 `myform`。考生需要认真检查提供的代码，找出表单消失的原因，并修复掉，最终让表单 “重见天日”。

### 思路

这题跟 Vue 2 半毛钱关系没有，单纯是 `index.html` 中没有引用 Element UI 的 js 😅

### 代码

```diff
diff --git 凭空消失的TA/index.html
@@ -8,6 +8,7 @@  <title>凭空消失的 TA</title>
  <script src="./js/vue.min.js"></script>
  <script src="./js/http-vue-loader.js"></script>
+ <script src="./element-ui-2.15.10/index.js"></script>
  <!-- 引入 element-ui 样式 -->
  <link rel="stylesheet" href="./element-ui-2.15.10/index.css" />
</head>
```

## 用户名片

### 思路

> The year is 2049...
>
> All websites use Tailwind, there are only 69 people remaining that know how to write custom CSS.
>
> These 69 people have to center divs to save the world.
>
> They are our only hope.
>
> (This is my pitch to Netflix for an upcoming movie)

Credit: [TheJackForge](https://twitter.com/thejackforge/status/1560637007742701570)

In case you still do not know how to center `div`s horizontally & vertically, refer to [11 Ways to Center Div or Text in Div in CSS](https://blog.hubspot.com/website/center-div-css) or [CSS-水平居中、垂直居中、水平垂直居中](https://segmentfault.com/a/1190000014116655).

### 代码

![效果图](https://raw.githubusercontent.com/OverflowCat/lanqiao-14-web/master/%E7%94%A8%E6%88%B7%E5%90%8D%E7%89%87/center-divs.webp)

```css
.avatar,
.card {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.user-card {
  width: 150px;
  height: 100%;
  position: relative;
  float: left;
  display: flex;
  justify-content: center;
}
```

## 芝麻开门

### 题目

>找到 `index.js` 文件中的 `mPrompt` 函数，完成函数中的 TODO 部分。
>
>1.  点击 “点击弹出对话框，输入咒语” 按钮会调用 `mPrompt` 函数，`mPrompt` 调用后页面显示对话框。`mPrompt` 函数必须返回一个 `promise` 对象。
>2.  在对话框中的输入框中输入文字后，点击确认按钮，对话框消失， `promise` 返回成功，`promise` 成功的值为输入的值。
>3.  只有当成功的值为 “芝麻开门” 时门自动打开（已实现）。
>4.  点击取消，对话框消失，`promise` 返回失败，失败的值为 `false`。
>5.  对话框的显示隐藏请使用 DOM 节点的添加删除实现。

### 思路

本题考察 Promise。在返回的 Promise 中添加 onclick 事件，并在函数中调用 Promise 的参数。

### 代码

```javascript
const incantations = "芝麻开门";
function init(el) {
  document.querySelector(".wrapper .btn").addEventListener("click", () => {
    mPrompt()
      .then((res) => {
        if (res === incantations) {
          document
            .querySelectorAll("#door .doors")[0]
            .classList.add("door-left");
          document
            .querySelectorAll("#door .doors")[1]
            .classList.add("door-right");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
/**
 * @description: 调用函数，开启弹窗，记录输入框的内容，并通过 promise 异步返回输入框中的内容
 * @return {Promise}
 */
function mPrompt() {
  // 弹窗必须使用以下结构 template 保存的是弹窗的结构字符串，可以先转化为 DOM 再通过 appendChild 方式插入到 body 中
  const template = `
        <div class="modal">
            <div class="message-box">
                <div class="message-header">请输入咒语</div>
                <div class="message-body">
                    <input type="text">
                </div>
                <div class="message-footer">
                    <button class="btn btn-small" id='cancel'>取消</button>
                    <button class="btn btn-small btn-primary" id='confirm'>确定</button>
                </div>
            </div>
        </div>
    `;
  const div = document.createElement("div");
  // TODO：待补充代码
  div.innerHTML = template;
  document.body.appendChild(div);
  const hide = () => div.remove();
  return new Promise(
    (resolve, reject) => {
      div.querySelector("button#cancel").onclick = e => {
        hide();
        reject(false);
      }
      div.querySelector("button#confirm").onclick = e => {
        resolve(div.querySelector("input").value);
      }
      hide();
    }
  );
}
```

## 宝贵的一票

### 题目

> 完成 `index.html` 文件中的 TODO 部分。
> 1.  点击添加选项，页面中新增一个选项。选项前文字按照：选项 1，选项 2，选项 3 ...... 顺序排列，当页面中的选项大于 2 个时，选项后面跟随删除按钮（即 x 图标）。带有删除图标的选项 DOM 结构如下：
> ```javascript
> <div>
>   <label>选项1</label>
>   <div>
>     <input type="text" />
>   </div>
>   <div>
>     <!-- 删除图标 -->
>     <img src="./images/x.svg" alt="" />
>   </div>
> </div>
> ```
> 2.  点击删除按钮，删除当前选项，并且选项前文字按照：选项 1，选项 2，选项 3 ...... 顺序排列，当选项数量小于等于 2 个时，选项后面无删除按钮。

### 思路

这题要求点删除按钮的时候删除的是对应的文本框，并且后面的选项序号需要再次排序。注意如果增加了选项的话，`选项1` 和 `选项2` 也是需要删除按钮的。直接 `querySelector` 改内容就好了，注意 template 的结构。

### 代码

见 `./宝贵的一票/index.html`。

## 粒粒皆辛苦

> **介绍**
>
> 俗话说 “民以食为天”，粮食的收成直接影响着民生问题，通过对农作物产量的统计数据也能分析出诸多实际问题。
>
> 接下来就让我们使用 ECharts 图表，完成 X 市近五年来的农作物产量的统计图吧～
>
> **准备**
>
> 本题已经内置了初始代码，打开实验环境，目录结构如下：
>
> ```
> ├── data.json
> ├── index.html
> └── js
>     ├── axios.min.js
>     └── echarts.min.js
> ```
>
> 其中：
>
> *   `index.html` 是主页面。
> *   `js/echarts.min.js` 是 ECharts 文件。
> *   `js/axios.min.js` 是 axios 文件。
> *   `data.json` 是对应年份的粮食产量数据，单位为万吨。
>
> 选中 `index.html` 右键启动 Web Server 服务（Open with Live Server），让项目运行起来。
>
> 接着，打开环境右侧的【Web 服务】，就可以在浏览器中看到如下效果：
>
> **目标**
>
> 请完成 `index.html` 文件中的 TODO 部分。
>
> 1.  完成数据请求（数据来源 `./data.json`）。
> 2.  `data.json` 中的数据中英文对照如下：
> <table><thead><tr><th align="center">英文名称</th><th align="center">中文名称</th></tr></thead><tbody><tr><td align="center">wheat</td><td align="center">小麦</td></tr><tr><td align="center">soybean</td><td align="center">大豆</td></tr><tr><td align="center">potato</td><td align="center">马铃薯</td></tr><tr><td align="center">corn</td><td align="center">玉米</td></tr></tbody></table>
> 3.  在页面的折线图和饼形图中正确显示粮食产量数据。其中折线图为五年数据，饼图只显示 2022 年数据。

### 思路

使用 `myChart.setOption()` 更新数据。EChart 会检测 diff。这个框架可以看一看 [菜鸟教程](https://www.runoob.com/echarts/echarts-ajax-data.html)。

## 绝美宋词

### 题目

> 请使用 Vue ，完成 `index.html` 文件中的 TODO 部分。
>
> 1.  完成数据请求（数据来源 `./data.json`），`data.json` 是宋词数据，`poetry_content` 表示词句，`title` 表示词牌名，`author` 表示词人。
> 2.  在输入框输入关键词时在 `ul`（`class = suggestions`）的元素中**实时显示**词牌名、词句、词人中包含关键词的**完整词句（包含词牌名、词人）列表**，当关键词为空或者匹配不到时 `ul`（`class = suggestions`）元素的子节点为空。完整词句的 DOM 结构按照如下规定显示：
>
> ```html
> <li>
>   <span>词句</span>
>   <span>词牌名 - 词人</span>
> </li>
> ```
>
> 例：
>
> ```html
> <li>
>   <span
>     >常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭</span
>   >
>   <span>如梦令 - 李清照</span>
> </li>
> ```
>
> 3.  高亮匹配到的所有词句中的关键词。即使用 `<span></span>` 标签包裹所有关键词。
>
> 例：(关键词：雨)
>
> ```html
> <li>
>   <span
>     >寒蝉凄切，对长亭晚，骤<span>雨</span
>     >初歇。都门帐饮无绪，方留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪冷落清秋节。今宵酒醒何处，杨柳岸晓风残月。此去经年，应是良辰美景虚设。便纵有千种风情，更与何人说</span
>   >
>   <span><span>雨</span>霖铃 - 柳永</span>
> </li>
> ```
>
> > **注意**：**本题要求的是实时显示，即输入完成的同时显示结果，非失去焦点显示**。

### 思路

这是我第一次用 Vue。在 Vue 2 中把 `<input/>` 的 `value` 绑定到变量并且在 `input` 更新时调用函数的方法：

```diff
<input
type="text"
id="search"
class="search"
placeholder="词牌名 词句 词人"
+ v-model="query"
+ @input="handleInput"
/>
```

根据文档，`@input` 会过滤掉 IME 的 buffer。题目给的效果图好像并没有这个行为，不过也过了，毕竟不知评测机制，并且没人会写带 IME 的 test。

### 代码

```diff
@@ -14,8 +14,12 @@
    <h1 style="text-align: center">输入关键字，找一首词</h1>
    <!-- TODO：待补充代码 -->
    <div class="search-form">
-     <input type="text" id="search" class="search" placeholder="词牌名 词句 词人" />
+     <input type="text" id="search" class="search" placeholder="词牌名 词句 词人" v-model="query" @input="handleInput" />
      <ul class="suggestions">
+       <li v-for="poem in filtered">
+         <span class="poet" v-html="poem.poetry_content"></span>
+         <span class="title" v-html="poem.title"></span>
+       </li>
      </ul>
    </div>
  </div>
@@ -23,6 +27,40 @@
    let vm = new Vue({
      el: '#app',
      // TODO：待补充代码
+     data: {
+       query: '',
+       poems: [],
+       filtered: []
+     },
+     created() {
+       this.queryData()
+     },
+     methods: {
+       highlight(text) {
+         return `<span class="highlight">${text}</span>`;
+       },
+       queryData() {
+         axios.get('./data.json').then(res => {
+           this.poems = res.data;
+         })
+       },
+       handleInput(e) {
+         if (this.query) this.filterData(this.query);
+         else this.filterData("哈哈哈没有东西!!")
+       },
+       filterData(keyword) {
+         this.filtered = this.poems.filter(
+           x => x.poetry_content.includes(keyword)
+             || x.author.includes(keyword)
+             || x.title.includes(keyword)
+         ).map(x => {
+           return {
+             poetry_content: x.poetry_content.replaceAll(keyword, this.highlight(keyword)),
+             title: `${x.title} - ${x.author}`.replaceAll(keyword, this.highlight(keyword)),
+           }
+         })
+       }
+     }
    })
  </script>
</body>
```

## 资讯接口

### 题目

> **介绍**
>
> 随着技术的发展，很多前端工程师已经不满足于只做诸如页面布局和交互这些开发工作了，很多人将目光逐渐转向了 “大前端” 范围，其中就包括不需要依赖后端提供接口自己就可以使用 node.js 编写一个后端接口服务。
>
> 下面就让我们也来使用 node.js 完成一个新闻资讯接口吧。
>
> **目标**
>
> 1.  通过在 `app.js` 书写代码，创建一个服务器，使服务在 **8080** 端口运行。
> 2.  访问 `/news` 返回资讯数据，访问其他任意路径均返回**字符串 404** 。
>
> <table><thead><tr><th>Url</th><th>请求方式</th><th>参数</th><th>响应结果</th></tr></thead><tbody><tr><td>news</td><td>GET</td><td>空</td><td>显示资讯数据</td></tr></tbody></table>
>
> 数据需要设置为 `utf8` 格式，资讯数据格式如下：
>
> ```javascript
> [
>   {
>     "channelId": "5572a108b3cdc86cf39001cd",
>     "name": "国内焦点"
>   },
>   {
>     "channelId": "5572a108b3cdc86cf39001ce",
>     "name": "国际焦点"
>   }
> ]
> ```
>
> 设置 `utf8` 格式代码:
>
> ```javascript
> res.setHeader("Content-type", "text/html;charset=utf8");
> ```
>
> 3.  通过 `node app.js` 运行代码，使服务处于运行状态，点击右侧 【web 服务】，页面上显示访问域名 +'/news' 返回资讯数据。

### 思路

使用 `http.createServer()`。注意一下设置 `Content-type` 的方式。

### 代码

见对应目录。

## 平地起高楼

### 题目

相当于把 `{id: number, parent_id: number: name}[]` 嵌套起来返回 `{id: number, parent_id: number: name, children: self[]}`。

### 思路

维护一个 `pid => id[]` 的 Map，并把原数组转成以 `id` 为 key 的 Map 即可。

## 收快递了

### 题目

相当于在 `{id: number, parent_id: number: name, children: self[]}` 中找到目标。

### 思路

递归即可。最后这两道标为了「困难」的题目其实就是不会 TLE 的算法题，没啥难度。倒是好久没写 JS 老是类型错误，尤其是前面 [宝贵的一票](#宝贵的一票) parent 就没类型了，比较讨厌。📃
