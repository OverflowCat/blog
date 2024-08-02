#import "./helper.typ": c
#set text(lang: "zh", cjk-latin-spacing: auto)

== 5-10

#let x = (1.585, 2.512, 3.979, 6.310, 9.988, 15.85)
#let y = (0.03162, 0.02291, 0.02089, 0.01950, 0.01862, 0.01513)
#let lnx = x.map(calc.ln)
#let lny = y.map(calc.ln)

#table(
  columns: (auto, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr),
  $ln x$, ..lnx.map(c).map(str),
  $ln y$, ..lny.map(c).map(str)
)

#import "@preview/plotst:0.2.0": *
#{
let data = lnx.zip(lny)

// Create the axes used for the chart 
let x_axis = axis(min: 0, max: 2.7, step: 0.5, location: "bottom", helper_lines: true)
let y_axis = axis(min: -4.3, max: -3.2, step: 0.1, location: "left", helper_lines: true)

// Combine the axes and the data and feed it to the plot render function.
let pl = plot(data: data, axes: (x_axis, y_axis))
graph_plot(pl, (100%, 25%))
graph_plot(pl, (100%, 25%), rounding: 30%, caption: "Graph Plot with rounding")
}
