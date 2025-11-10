#set page(width: auto, height: auto, margin: 1cm)
#import "../yang.typ": *
#let han = (
  ```
  佳人不是到錢塘，
  半世烟花債未償。
  玉面豈應埋水國，
  冰心自可對金郎。
  斷腸夢裡根緣了，
  薄命琴終怨恨長。
  一片才情千古累，
  新聲到底為誰傷？
  ```
    .text
    .split("\n")
)

#show regex("[金錢塘]"): pn
#show "新聲": bn
#show "薄命": bn

#let vi = [
  Giai-nhân bất thị đáo Tiền-đường,
  Bán thế yên-hoa trái vị thường.
  Ngọc diện khởi ưng mai thủy-quốc,
  Băng-tâm tự khả đối Kim-lang.
  Đoạn trường mộng lý căn duyên liễu,
  _Bạc mệnh_ cầm chung oán-hận trường.
  Nhất phiến tài tình thiên cổ lụy,
  _Tân thanh_ đáo để vị thùy thương.
]

#let juai = [
  Jialesn becsif dof Qieesntasng,
  buoofnsif yeenhua dseef wuif tsasng.

  Yocmieefn qixying mees suixgoc,
  bingxing dsifkexu dufi Jing lasng.

  Duoofntsasng moofnglixi genyueesn liox,
  _Bac Mifng_ qisng dsoong yueefnhefn tsasng.

  Yeecpieefn tsesqisng qiengux lufi,
  _Xing Sen_ dofdix wifisusi sang.
]

#let s = (越, 揚) => context {
  let i = counter("i")
  let 漢 = han.at(i.get().first())
  i.step()
  stack(dir: ttb, spacing: .7em)[
    #show regex("(\w|\p{P})+"): vnc
    #越
  ][
    #set text(1.6em, tracking: .1em, font: "凝書體 3.2")
    #show regex("\\p{P}"): it => box(
      move(it, dx: -.15em, dy: if it.text == "？" {
        0em
      } else {
        .25em
      }),
    )
    #漢
  ][
    #yang(揚)
  ]
  v(.4em)
}

#let i = counter("i")

#s[ Giai-nhân bất thị đáo Tiền-đường, ][ Jialesn becsif dof Qieesntasng,]
#s[ Bán thế yên-hoa trái vị thường. ][ buoofnsif yeenhua dseef wuif tsasng.]
#s[ Ngọc diện khởi ưng mai thủy-quốc, ][ Yocmieefn qixying mees suixgoc,]
#s[ Băng-tâm tự khả đối Kim-lang. ][ bingxing dsifkexu dufi Jing lasng.]
#s[ Đoạn trường mộng lý căn duyên liễu, ][ Duoofntsasng moofnglixi genyueesn liox,]
#s[ _Bạc mệnh_ cầm chung oán-hận trường. ][ _Bac Mifng_ qisng dsoong yueefnhefn tsasng.]
#s[ Nhất phiến tài tình thiên cổ lụy, ][ Yeecpieefn tsesqisng qiengux lufi,]
#s[ _Tân thanh_ đáo để vị thùy thương? ][ _Xing Sen_ dofdix wiifsusi sang?]
