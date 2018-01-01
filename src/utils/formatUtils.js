export const toCAD = number => {
  if (number) {
    const currency = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `$${currency}`
  } else {
    return null
  }
}
