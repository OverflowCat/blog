#let t = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18)
#let x1 = (164.3, 71.3, 58.9, 105.4, 74.4, 201.5, 136.4, 96.1, 89.9, 179.8, 114.7, 142.6, 155, 136.4, 173.6, 111.6, 179.6, 158.1)
#let x2 = (0.56, 0.56, 4.34, 0.84, 6.58, 2.38, 13.16, 14.14, 16,24, 17.64, 15.28, 23.34, 23.34, 30.24, 32.34, 2.66, 37.52, 41.86)
#let x3 = (268.6, 277.1, 62.9, 266.9, 100.3, 209,1, 78.2, 198.9, 294.1, 190.4, 188.7, 193.8, 227.8, 124.1, 285.6, 243.1, 343.4, 210.8)
#let y = (83.2, 78, 92.3, 79.3, 70.2, 100.1, 105.3, 120.9, 120.9, 66.3, 98.8, 124.8, 100.1, 120.9, 123.5, 70.2, 218.4, 128.7)

#let N = t.len()
$ N = #N $

#let avg = (data) => data.sum() / data.len()

#let ymean = avg(y)
#y.sum()
#let x1mean = avg(x1)
#let x2mean = avg(x2)
#let x3mean = avg(x3)

#ymean, #x1mean, #x2mean, #x3mean

#let calcl = (data) => {
  let ss = data.map(x => calc.pow(x, 2)).sum()
  let sum = data.sum()
  let sm = sum * sum / N
  let lxx = ss - sm
  lxx
}

#import "helper.typ": c

// #let ss11 = x1.map(x => calc.pow(x, 2)).sum()
// #let l11 = ss11 - x1.sum() * x1.sum() / N
#let l11 = calcl(x1)
#l11
#let l22 = calcl(x2)
#l22
#let l33 = calcl(x3)
#l33

#let clxy = (x, y, X, Y) => {
  let sxy = x.zip(y).map(((x, y)) => x * y).sum()
  $ sum_t #X #Y = #c(sxy) $
  let lxy = sxy - x.sum() * y.sum() / N
  $ l = sum_t #X #Y - 1/N (sum #X)(sum #Y) = #c(lxy) $
  return lxy
}

#let l12 = clxy(x1, x2, $x_(t 1)$, $x_(t 2)$)
#let l13 = clxy(x1, x3, $x_(t 1)$, $x_(t 3)$)
#let l23 = clxy(x2, x3, $x_(t 2)$, $x_(t 3)$)

#let l1y = clxy(x1, y, $x_(t 1)$, $y_t$)
#let l2y = clxy(x2, y, $x_(t 2)$, $y_t$)
#let l3y = clxy(x3, y, $x_(t 3)$, $y_t$)

#let A = (l11, l12, l13, l12, l22, l23, l13, l23, l33)
#A
#let B = (y.sum(), l1y, l2y, l3y)
#B