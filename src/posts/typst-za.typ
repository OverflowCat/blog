#metadata(
  (
    title: "为 Typst 添加壮文本地化",
    date: "2026-09-23T11:17:49.408Z",
    noscript: true,
    licence: false,
    layout: "@/layouts/Default.astro",
    categories: (
      "Typst",
    ),
    tags: (),
    draft: true,
    ext: "typ",
  ),
)<frontmatter>

#let za = (c, sawndip: false) => {
  set text(lang: "za", script: if sawndip { "Hani" } else { "Latn" })
  c
}

#let qza = c => {
  set text(lang: "zh", fill: green.opacify(50%))
  c
}

#let zh = c => {
  set text(lang: "zh")
  c
}

Typst 有堆为 PDF 里的元素提供的本地化的 txt，只有很少的几个词：

#let locale-column-langs = ("key", "en", "zh", "zh", "ja", "ko", "vi", "za")

#let locale-rows = (
  ("figure", "Figure", "图", "圖", "図", "그림", "Hình", "Doz"),
  ("table", "Table", "表", "表", "表", "표", "Bảng", "Biuj"),
  ("equation", "Equation", "式", "式", "式", "---", "Phương trình", "Daengjsik"),
  (
    "bibliography",
    "Bibliography",
    "参考文献",
    "書目",
    "参考文献",
    "참고 문헌",
    "Tài liệu tham khảo",
    "Vwnzyen Doiqciuq",
  ),
  ("heading", "Section", "小节", "小節", "節", "---", "Phần", "Ciet"),
  ("outline", "Contents", "目录", "目錄", "目次", "차 례", "Mục lục", "Moegloeg"),
  ("raw", "Listing", "代码", "程式", "リスト", "---", "Chương trình", "Daihmax"),
  ("page", "page", "页", "頁", "ページ", "페이지", "trang", "yieb"),
  ("footnote", "Footnote", "脚注", "註腳", "---", "---", "Chú thích", "Gejnaeuz"),
  ("email", "Email", "电子邮件", "電子郵件", "---", "---", "Email", "E-mail"),
  ("telephone", "Telephone", "电话", "電話", "---", "---", "Điện thoại", "Denva"),
)

#let locale-cells = locale-rows.map(row => row
  .enumerate()
  .map(((i, value)) => {
    set text(lang: locale-column-langs.at(i))
    [#value]
  })).flatten()

#table(
  columns: 8,
  table.header(..locale-column-langs.map(raw)),
  table.hline(),
  ..locale-cells,
)

在给 Typst 补充标准壮语（语言代码
`za`）本地化时，有几个看起来很普通的排版术语，实际上并不好翻译。这里整理一下考证过程。

=== `figure` → `Doz`；`table` → `Biuj`
<dozbuij>
- 《广西民族报》文章会 AI 生成图片下写
  #link("https://www.guangximinzubao.cn/szbzw/html/2025-11/12/content_54939.htm")[#za[#strong[Doz] neix dwg AI guh.]]，即「这张图是
  AI 生成的」。现在的纸媒也是真会偷懒。
- 广西壮族自治区少数民族语言文字工作委员会公布的#link("https://www.guangximinzubao.cn/szbzw/html/2024-08/28/content_51331.htm")[第八批壮文规范词语]中，「国家宏观资产负债表管理」译作
  #qza[aen biuj dawzcaiq hungzgvanh swhcanj guekgya]，其中 #qza[biuj] 就对应「表」。
- 另外，《广西民族报》#link("https://www.guangximinzubao.cn/szbzw/html/2022-05/18/content_43635.htm")[介绍《广西通志·民族志》]时，说该书使用了「#strong[doz]､
  #strong[biuj]」等体裁形式： \> Bouh saw neix yungh ceiq､
  lwnh、geiq、cienz、#strong[doz]､ #strong[biuj]、loeg daengj dijcaiz,
  bienraiz cujyau dwg yungh ceiq.

=== `equation` → `Daengjsik`
<equation>
对应「等式」。《壮汉词典》和标准化词汇表里都有。

=== `bibliography` → `Vwnzyen Doiqciuq`
<bibliography>
即「文獻對照」，壮文维基百科的既有用法。（壮文维基百科上的CS1/2模块，我也做了本地化。）如以下页面：

- #link("https://za.wikipedia.org/wiki/Ninznaundaek")[Ninznaundaek]
- #link("https://za.wikipedia.org/wiki/Digoz_Lozmaj_Sinzswng")[Digoz Lozmaj Sinzswng]

=== `heading` → `Ciet`
<heading>
Typst 英文的本地化文件里用的是 `Section`，壮文采用
#strong[Ciet]。#link("https://www.sanmin.com.tw/product/index/007006529")[《布洛陀史诗》的壮---汉---泰对照版]目录中有：

#quote(block: true)[
:za\[Ciet Daih'it\] --- 第一节

:za\[Ciet Daihngeih\] --- 第二节

:za\[Cieng Daih'it\] --- 第一章
]

=== `outline` → `Moegloeg`
<outline>
"目录"。前述的《布洛陀史诗》的目录页直接以 `Moegloeg`
对应汉文"目录"。#link("https://www.guangximinzubao.cn/szbzw/html/2016-01/13/content_16174.htm")[《壮语吸收外来新词术语的方式》]把
`moegloeg（目录）`
列为早期从粤语吸收的"老音译"，并指出这类词使用频率较高、已经成为壮语常用语。

=== `raw` → `Daihmax`
<raw>
Typst 的 `#raw{:typ}` 在实际排版中一般就对应代码块。`zh` 的 locale
也直接用了 `代码`。

那么代码怎么说呢？自治区少数民族语言文字工作委员会 2025
年发布的#link("https://www.guangximinzubao.cn/sy/jxzw/412847.html")[第九批壮文规范词语]（#link("https://www.guangximinzubao.cn/szbzw/page/21/2024-08/28/08/2024082808_pdf.pdf")[PDF]）中，第
150 项"预植代码"（pre-installed code）写作 `daihmax ndaem gonq` 。

不过我又找到了一个新借词的 doublet，即借自官话 daimaj。在今年6月7日 Lij
Yihangz的《#link("https://www.guangximinzubao.cn/zw/f_282584/637719.html")[Guhhong Guh Baenz Siengjmuengh Raemxhanh Rwed Daeuj Vuenyungz]》中：

#quote(block: true)[
Gij(个) doxgaiq(东西) cinwngz(智能) hawj(让) vunz(人) gwndaenj(生活)
gig(很) fuengbienh(方便)，youq(在) ndaw(里) ranz(家) mbouj(不) yungh(用)
cihgeij(自己) doenghfwngz(动手) gij(个) saeh(事情) couh(就) gag(自己)
guh(做) daengz(到)，mbouj(不) caiq(再) aeu(要) raeuz(我们) sai(花费)
rengz(力气)；daj(从) "DeepSeek" mizok(出现)，gij(的) hong(工作)
yungh(用) uk(脑) haenx(那些) hix(也) miz(有) #strong[daimaj]\(代码)
dingjlawh(代替)。
]

往后读了读，哎呀还有鸿蒙：

#quote(block: true)[
Mienhdoiq(面对) Meijgoz(美国) caeuq(和) guek(国) raeuz(我们)
gaicawx(买卖) baenz(形成) doxceng(相争)
doxngaed(摩擦)，#strong[Hungzmungz]\(鸿蒙) #strong[Hidungj]\(系统)
swnhgeiz(顺势) cauh'ok(诞生)，dwg(是) gohgi(科技) guek(国) raeuz(我们)
boiz(还) mbat(一) gienz(拳) hawj(给) de(它).
]

#quote(block: true)[
【译】面对美国和我国在贸易上形成竞争摩擦，鸿蒙系统顺势创出，是我国科技还给它的一拳。
]

我们鸿蒙真的是太厉害了。

#quote(block: true)[
工作不但能让人过上好日子，更关系到国家和民族的发展。假如每个青年都这样，什么都不管、什么都不想，躲进自己的"美好"里，一天天闲混下去，那么国家又凭什么日益强大，稳稳屹立在世界前列呢？
]

#quote(block: true)[
青年曹原带领团队，凭着聪明的头脑和不断探索实践，发现了石墨烯超导现象，为超导研究领域开辟了一条新路。面对美国和我国在贸易上形成竞争摩擦，鸿蒙系统顺势创出，是我国科技还给它的一拳。
]

#quote(block: true)[
另外，我国大力推进精准扶贫工作，使农村近一亿贫困人口脱贫，为全世界脱贫树立了好榜样，让世人知晓。
]

#quote(block: true)[
"羡子年少正得路，有如扶桑初日升。"我们是这个时代的青年，要敢于肩负起时代交给我们的重任，认真工作。要不怕辛苦，勤奋工作，创造出丰富的物质成果，创造出精神财富；要在工作中不断创新，沿着祖国复兴的道路前进，使自己变得越来越强，使自己成为一个有用的人。
]

说到DeepSeek，标准化词汇又是不得不品鉴的一环。标准化委员会总是喜欢在借汉和自己仿译之前走极端。就在同一份文件中，列出了

#figure(
  align(center)[#table(
    columns: 3,
    align: (auto,auto,auto,),
    table.header([序号], [汉文], [壮文],),
    table.hline(),
    [96], [深度求索(DeepSeek)], [Ndaemra],
    [97], [深度推理模型], [aen vunq ndaemra],
  )]
  , kind: table
  )

vunq 是"模"的意思，aen 是量词。显然，正常人不会使用这个翻译。此外，vunq
ndaemra 到底是"深度推理模型"还是"深度求索模型"？只能通过大小写区分了。

=== `page` → `yieb`
<page-yieb>
《广西民族报》#link("https://www.guangximinzubao.cn/szbzw/html/2025-06/11/content_53748.htm")[介绍一本古壮字《西游记》抄本]时写"cek
ndeu, 40 #strong[yieb]"，即一册四十页；紧接着又有
`moix buenq yieb`，指"每半页"。

此外，只有这个是首字母小写的。壮语虽然用字母当tone
marker、用中文标点，好在没有像
#link("https://zh.wikipedia.org/wiki/%E8%B3%BD%E5%A4%8F%E8%AA%9E")[SaySiyat]
那样，s 和 S 是两个不同的字母。

=== `footnote` → `Gejnaeuz`
<footnote-gejnaeuz>
没有找到一个对应"脚注"的词语。`gejnaeuz`
是"解释、说明、注释"，是壮文版《著作选读》中篇末"注释"部分的处理方式。而且，其他语言也不都是对应"footnote"，也有"note"的情况。

=== `email` → `E-mail`
<email-e-mail>
《广西民族报》的版权/联系信息长期直接使用 `E-mail:`
这一写法，报纸版面底部就可以看到 `E-mail:gxmzb2@163.com`。

=== `telephone` → `Denva`
<telephone-denva>
《著作选读》的版权页就是这么写的。壮文文学作品中也大量出现
`dwk denva`（打电话）、`ciep denva`（接电话）这样的实际搭配。`va`
对应音节 `hua`，例如"华为"名称是 #strong[Vaz]veiz。

最后得到的 Typst 壮文本地化词表是：

- `figure` → #strong[Doz]
- `table` → #strong[Biuj]
- `equation` → #strong[Daengjsik]
- `bibliography` → #strong[Vwnzyen Doiqciuq]
- `heading` → #strong[Ciet]
- `outline` → #strong[Moegloeg]
- `raw` → #strong[Daihmax]
- `page` → #strong[yieb]
- `footnote` → #strong[Gejnaeuz]
- `email` → #strong[E-mail]
- `telephone` → #strong[Denva]

PR 等了两周的时间，最终是合并了。不过，牢劳说没有办法 review：

#quote(block: true)[
laurmaedje left a comment
(#link("https://github.com/typst/typst/pull/8802#issuecomment-5730591134")[typst/typst\#8802]):

Well, this is almost impossible to verify for me (basically no search
results), so I'll trust you on this one. Thanks!
]

之前的本地化 PR 里，有用过 AI 审核，看来他用的 AI 有点拉，真是 caeuq
goep aeu bwn。
