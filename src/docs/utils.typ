#import "@preview/showybox:2.0.4": showybox
#let q(content) = {
  showybox(
    [
      #set text(font: "HarmonyOS Sans SC", weight: "medium")
      #content
    ],
    frame: (
      body-color: rgb("ecfde1"),
      border-color: rgb("93e87d"),
      radius: 0pt,
      thickness: (
        left: 4pt,
        right: 0pt,
        top: 0pt,
        bottom: 0pt,
      ),
    ),
  )
}

#let pth = (name) => raw(name, block: false)
