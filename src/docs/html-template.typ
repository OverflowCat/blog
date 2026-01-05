#import "@preview/hyperscript:0.1.0": h as htmlelem
#let h = (s, it) => htmlelem(s.replace(regex(" "), "."), it)

#let template = doc => {
  set text(lang: "zh", region: "CN")

  let in-table = state("in-table", false)
  let in-stack = state("in-stack", false)
  show table: it => context {
    in-table.update(true)
    html.frame(block(it, width: 40em))
    in-table.update(false)
  }
  show stack: it => context {
    in-stack.update(true)
    html.frame(block(it, width: 45em))
    in-stack.update(false)
  }
  show image: it => html.frame(block(it, width: 35em))


  show math.equation.where(block: false): x => context {
    if in-table.get() or in-stack.get() {
      return x
    }
    box(h("span eq", html.frame(x)))
  }
  show math.equation.where(block: true): x => context {
    if in-table.get() or in-stack.get() {
      return x
    }
    h(
      "div m-block-2 flex flex-row justify-center inline-full",
      h("span eq", html.frame(x)),
    )
  }

  doc
}
