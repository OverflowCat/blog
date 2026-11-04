// typst compile src/icons/typst-za-og-image.typ public/og/typst-za.png --ppi 96 --font-path src/icons
#let teal = rgb("239dae")
#let pale = rgb("c5edf0")
#let deep = rgb("125563")

#set page(width: 1200pt, height: 630pt, margin: 0pt, fill: teal)
#set text(font: "Sart Sans", lang: "za")
#set par(leading: 0pt)

// Position each word by its center so the composition survives font changes.
#let word(x, y, size, body, font: "Sart Sans", weight: "regular", style: "normal", fill: pale) = context {
  let label = text(font: font, size: size, weight: weight, style: style, fill: fill, body)
  let bounds = measure(label)
  place(top + left, dx: x - bounds.width / 2, dy: y - bounds.height / 2, label)
}

#word(267pt, 211pt, 88pt, [Doz], font: "Sart Sans", style: "italic", fill: deep)
#word(545pt, 173pt, 54.4pt, [Typst], weight: "medium", fill: white)
#word(825pt, 207pt, 66.4pt, [Moegloeg], weight: "light")

#word(600pt, 315pt, 158pt, [Vahcuengh], font: "Sart Sans", weight: "bold", style: "italic", fill: white)

#word(369pt, 426pt, 64pt, [Gejnaeuz], weight: "light")
#word(916pt, 410pt, 91.6pt, [Biuj], font: "Sart Sans", style: "italic", fill: deep)
#word(667pt, 462pt, 45pt, [Daihmax], fill: rgb("9bd8df"))
