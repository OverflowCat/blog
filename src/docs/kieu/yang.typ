
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

#let yang = (c, highlighting: true) => {
  show pattern: it => {
    let tone = it.text.find(regex("[sxf0-4]$"))
    if tone == none {
      let res = char-map.at(it.text, default: (it.text,)).first()
      return text(res, fill: eastern.darken(10%))
    }
    let arr = it.text.split(tone)
    assert(arr.len() == 2 and arr.last() == "", message: it.text)
    let vowel = arr.first()
    let tone-index = if tone == "s" or tone == "2" {
      /* 2 */
      4
    } else if tone == "x" or tone == "3" {
      3
    } else if tone == "f" or tone == "4" {
      /* 4 */
      1
    } else {
      0
    }
    let highlight = (blue.darken(60%), green.darken(25%), black, purple, orange)
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
    text(res, fill: highlight.at(tone-index))
  }
  show regex("[YAEUIOyaeuio]+c"): it => text(it.text, fill: red.darken(15%))

  c
}

#let pn = noun => {
  underline(noun, stroke: 1.2pt, offset: 3pt)
}

#let wavy = tiling(size: (4pt, 3pt), curve(
  stroke: .7pt,
  curve.move((0%, 10%)),
  curve.cubic((20%, 0%), (30%, 30%), (50%, 30%), relative: true),
  curve.cubic(auto, (30%, -30%), (50%, -30%), relative: true),
))

#let bn = noun => {
  underline(noun, evade: false, offset: 2pt, stroke: (
    thickness: 3pt,
    paint: wavy,
  ))
}

#import "@preview/chiandiau:0.1.0": *
#let vi-tones = (
  "áắấéếíóốớúứýÁẮẤÉẾÍÓỐỚÚỨÝ\u0301", // sắc (´)
  "àằầèềìòồờùừỳÀẰẦÈỀÌÒỒỜÙỪỲ\u0300", // huyền (`)
  "ảẳẩẻểỉỏổởủửỷẢẲẨẺỂỈỎỔỞỦỬỶ\u0309", // hỏi (˘ˀ)
  "ãẵẫẽễĩõỗỡũữỹÃẴẪẼỄĨÕỖỠŨỮỸ\u0303", // ngã (~)
  "ạặậẹệịọộợụựỵẠẶẬẸỆỊỌỘỢỤỰỴ\u0323", // nặng (.)
)
#let detect-vi-tone(s) = {
  for (i, chars) in vi-tones.enumerate() {
    if regex("[#" + chars + "]") in s {
      return i + 1
    }
  }
  0
}

#let vn-scheme = (44, 35, 21, 14, 45, 31)
#let vnc = s => {
  let words = s.text.split(regex("( |-)"))
  for w in words {
    let tone-num = detect-vi-tone(w)
    let conter = vn-scheme.at(tone-num)
    tone(w, conter, pron-size: .85em, width: .8em) + h(.1em)
  }
}
