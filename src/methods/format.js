function priceFormat(price) {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return ''
  }
}

function dateFormat(time) {
  return new Date(time * 1000).toLocaleDateString()
}

export { priceFormat, dateFormat }