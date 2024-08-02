#set text(cjk-latin-spacing: auto, lang: "cmn")
#import "helper.typ": average, stderr, c, c2, r, r0
#import "@preview/unify:0.5.0": num, qty

#let tDistribution(n, alpha) = {
  let data = (
    "4": (4.79, 11.46),
    "5": (3.56, 6.53),
    "6": (3.04, 5.04),
    "7": (2.78, 4.36),
    "8": (2.62, 3.96),
    "9": (2.51, 3.71),
    "10":(2.43, 3.54),
    "11":(2.37, 3.41)
  )
  if alpha == 0.01 {
    data.at(str(n)).at(1)
  }
  else if alpha == 0.05 {
    data.at(str(n)).at(0)
  } else {
    panic[$alpha$ 必须为 0.01 或 0.05]
  }  
}

/**
 * data: 数组
 * alpha: 显著性水平
*/
#let roman(data, alpha) = {
  let n = data.len()
  let avg = average(data)
  let vs = data.map(x => x - avg).map(calc.abs)

  let v_d = -1
  let d = -1
  for (i, v) in vs.enumerate() {
    if v > v_d {
      d = i
      v_d = v
    }
  }
  let data_without_d = ()
  let x_d = none
  for (i, x) in data.enumerate() {
    if i == d {
      x_d = x
    } else {
      data_without_d.push(x)
    }
  }
  let avg2 = average(data_without_d)
  let vs2 = data_without_d.map(x => x - avg2).map(calc.abs)
  // let sig2 = calc.sqrt(vs2.map(x => x*x).sum() / (n - 2))
  let sig2 = stderr(data_without_d)
  let K = tDistribution(n, alpha)
  let vd = calc.abs(x_d - avg2)
  let Ksigma = K * sig2
  let flag = vd > Ksigma
  let content = [
    // $x_d = #x_d, overline(x) = avg2$
    对于测量列 $x_1, x_2, dots.c, x_n, n=#n$，怀疑第 $d=#(d+1)$ 个数据 $x_d = #qty(r0(x_d), "V")$ 为离群值。
    
    将其剔除后计算平均值 $display(overline(x) = 1/(n-1) sum^n_(i=1,i!=d) x_i=#qty(r(avg2), "V"))$，进而求得测量列的标准差 $sigma=sqrt((sum^(n-1)_(i=1) v_i^2)/(n-2)) = #qty(c(sig2), "V")$。
    
    由表2.1.5查得 $t$ 分布的检验系数 $K(#n, alpha) = #K$。

    因为 $#c(vd) = |x_d - overline(x)| #if flag {$>=$} else {$<$} K(n, alpha) sigma = #r(Ksigma)$，
    所以#if flag [需要剔除] else [不需要剔除，检验完毕]。
  ]
  if flag {
    let (rcontent, rdata) = roman(data_without_d, alpha)
    content = [
      #content

      #rcontent
    ]     
    data = rdata
  }
  (content, data)
  /* , if flag {
    data_without_d
  } else {
    data
  } )*/
}

// #roman((10, 10.02, 10.1, 9.4), 0.01).at(0)
