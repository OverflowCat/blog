#import "./vendor/lib.typ": round

#let hr = line(stroke: black.lighten(70%), length: 100%)
#let r0 = n => round(n, if str(n).starts-with("0.") {2} else {3})
#let r = n => round(n, 4)
#let rx = n => round(n, 5)
#let ry = n => round(n, 5)
#let rxy = n => round(n, 5)
#let c = x => calc.round(x, digits: 3)
#let c2 = x => calc.round(x, digits: 2)
#let average(arr) = {
  let n = arr.len()
  arr.sum() / n
}
#let stderr(arr) = {
  let avg = average(arr)
  let vs = arr.map(x => x - avg)
  let n = arr.len()
  let sigma2 = vs.map(x=>x*x).sum()/(n - 1)
  calc.sqrt(sigma2)
}