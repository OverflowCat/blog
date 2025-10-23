#set page("a5")

佳人不是到錢塘，半世烟花債未償。

玉面豈應埋水國，冰心自可對金郎。

斷腸夢裡根緣了，薄命琴終怨恨長。

一片才情千古累，新聲到底為誰傷？

#stack(dir: ltr, spacing: 1em)[

Giai-nhân bất thị đáo Tiền-đường,#linebreak()
Bán thế yên-hoa trái vị thường.


Ngọc diện khởi ưng mai thủy-quốc,#linebreak()
Băng-tâm tự khả đối Kim-lang.

Đoạn trường mộng lý căn duyên liễu,#linebreak()
_Bạc mệnh_ cầm chung oán-hận trường.

Nhất phiến tài tình thiên cổ lụy,#linebreak()
_Tân thanh_ đáo để vị thùy thương.
][
/* 
04?326
123456

1->0
4->2
3->4
2->5
 */
#let char-map = (
  "A": "AÀẢÃÁẠ",
  "Ă": "ĂẰẲẴẮẶ",
  "AA": "ÂẦẨẪẤẬ",
  "E": "EÈẺẼÉẸ",
  "EE": "ÊỀỂỄẾỆ",
  "I": "IÌỈĨÍỊ",
  "O": "OÒỎÕÓỌ",
  "OO": "ÔỒỔỖỐỘ",
  "Ơ": "ƠỜỞỠỚỢ",
  "U": "UÙỦŨÚỤ",
  "Ư": "ƯỪỬỮỨỰ",
  "Y": "YỲỶỸÝỴ",
  "a": "aàảãáạ",
  "ă": "ăằẳẵắặ",
  "aa": "âầẩẫấậ",
  "e": "eèẻẽéẹ",
  "ee": "êềểễếệ",
  "i": "iìỉĩíị",
  "o": "oòỏõóọ",
  "oo": "ôồổỗốộ",
  "ơ": "ơờởỡớợ",
  "u": "uùủũúụ",
  "ư": "ưừửữứự",
  "y": "yỳỷỹýỵ",
)
#let pattern = regex("(?i)(([aeuio]|ee|oo|ui|ii)[sxf0-4]|ee|oo)")
// #show regex("[a-zA-Z]+"): set text(fill: blue)
#show pattern: it => {
  let tone = it.text.find(regex("[sxf0-4]$"))
  if tone == none {
    let res = char-map.at(it.text, default: (it.text, )).first()
    return text(res, fill: green)
  }
  let arr = it.text.split(tone)
  assert(arr.len() == 2 and arr.last() == "", message: it.text)
  let vowel = arr.first()
  let tone-index = if tone == "s" or tone == "2" { /* 2 */ 4 } else if tone == "x" or tone == "3" { 3 } else if tone == "f" or tone == "4" { /* 4 */ 1 } else { 0 }
  let mapping = char-map.at(vowel, default: none)
  let get-char = mapping => mapping.codepoints().at(tone-index, default: mapping.first())
  let res = if mapping == none {
    let letters = vowel.codepoints()
    mapping = char-map.at(letters.first())
    letters.at(0) = get-char(mapping)
    letters.join()
  } else {
    get-char(mapping)
  }
  text(res, fill: red)
}


Jialesn becsif dof Qieesntasng,#linebreak()
buoofnsif yeenhua dseef wuif tsasng.

Yocmieefn qixying mees suixguoc,#linebreak()
bingxing dsifkexu dufi Jing lasng.

Duoofntsasng moofnglixi genyueesn liox,#linebreak()
_Bac Mifng_ qisng dsoong yueefnhefn tsasng.

Yeecpieefn tsesqisng qiengux lufi,#linebreak()
_Xing Sen_ dofdix wifi susi sang.
]
