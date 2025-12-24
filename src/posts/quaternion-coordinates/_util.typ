#let xg = [$x_upright(g)$ 轴]
#let yg = [$y_upright(g)$ 轴]
#let zg = [$z_upright(g)$ 轴]

#let i = $overline(i)$
#let j = $overline(j)$
#let k = $overline(k)$

#let long = (num, symbol: "E") => {
  if (num == 0 or num == 180) {
    symbol = "E(W)"
  }
  $num degree #h(0.1em) upright(symbol)$
}

#let lat = (num, symbol: "N") => $num degree #h(0.1em) upright(symbol)$
