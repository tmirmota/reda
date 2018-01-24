export const neighborhoodName = features => {
  const neighborhoodObj = features.find(
    ({ place_type }) => place_type[0] === 'neighborhood'
  )
  if (neighborhoodObj) {
    return neighborhoodObj.text
  } else {
    const placeObj = features.find(
      ({ place_type }) => place_type[0] === 'place'
    )
    return placeObj.text
  }
}

const sortNumber = (a, b) => {
  return a - b
}

const median = array => {
  array.sort(sortNumber)

  var half = Math.floor(array.length / 2)

  if (array.length % 2) return array[half]
  else return (array[half - 1] + array[half]) / 2.0
}

const quantile = (array, percentile) => {
  array.sort(sortNumber)
  const index = Math.floor(percentile * (array.length - 1))
  return array[index]
}
