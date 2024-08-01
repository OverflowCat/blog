#let a = "typst"
123 $oo RR$
#a
#import "@preview/tablem:0.1.0": tablem
#set text(font: ("Garamond", "Noto Sans CJK SC"))
#tablem[
  | *Name* | *Location* | *Height* | *Score* |
  | ------ | ---------- | -------- | ------- |
  | John   | Second St. | 180 cm   |  5      |
  | Wally  | Third Av.  | 160 cm   |  10     |
]