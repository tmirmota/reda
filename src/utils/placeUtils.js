export const neighborhoodName = features => {
  const neighborhoodObj = features.find(
    ({ place_type }) => place_type[0] === 'neighborhood',
  )
  if (neighborhoodObj) {
    return neighborhoodObj.text
  } else {
    const placeObj = features.find(
      ({ place_type }) => place_type[0] === 'place',
    )
    return placeObj.text
  }
}

export const getRent = (rentals, feature) => {
  let totalpricebed1 = 0
  let totalpricebed2 = 0
  let totalpricebed3 = 0

  let countbed1 = 0
  let countbed2 = 0
  let countbed3 = 0
  if (rentals.length > 0) {
    rentals.map(rental => {
      const bedrooms = rental.properties['BEDROOMS']
      const price = rental.properties['PRICE']
      if (bedrooms === 1) {
        totalpricebed1 += price
        countbed1++
      } else if (bedrooms === 2) {
        totalpricebed2 += price
        countbed2++
      } else if (bedrooms >= 3) {
        totalpricebed3 += price
        countbed3++
      }
      return true
    })
  }
  const ctname = feature.properties['CTNAME']

  return {
    CTNAME: ctname,
    AVERAGE_BEDROOM_1: totalpricebed1 > 0 ? totalpricebed1 / countbed1 : 0,
    AVERAGE_BEDROOM_2: totalpricebed2 > 0 ? totalpricebed2 / countbed2 : 0,
    AVERAGE_BEDROOM_3: totalpricebed3 > 0 ? totalpricebed3 / countbed3 : 0,
    AVERAGE_BEDROOM_1_COUNT: countbed1,
    AVERAGE_BEDROOM_2_COUNT: countbed2,
    AVERAGE_BEDROOM_3_COUNT: countbed3,
  }
}
