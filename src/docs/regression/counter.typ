#let headingNumbering = (..numbers) => {
  let level = numbers.pos().len()
  if (level == 1) {
    return none
  } else if (level == 2) {
    return numbering("一 ", numbers.pos().at(level - 1))
  } else {
    return numbering("1", numbers.pos().at(level - 1))
  }
}
