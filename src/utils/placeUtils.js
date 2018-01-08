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

export const getRent = (rentals, feature) => {
  let totalprice1 = 0
  let totalprice2 = 0
  let totalprice3 = 0

  let totalsqft1 = 0
  let totalsqft2 = 0
  let totalsqft3 = 0

  let countprice1 = 0
  let countprice2 = 0
  let countprice3 = 0

  let countsqft1 = 0
  let countsqft2 = 0
  let countsqft3 = 0

  if (rentals.length > 0) {
    rentals.map(rental => {
      const bedrooms = rental.properties['BEDROOMS']
      const price = rental.properties['PRICE']
      const sqft = rental.properties['SQFT']
      if (bedrooms === 1) {
        totalprice1 += price
        countprice1++
        if (sqft > 0) {
          totalsqft1 += sqft
          countsqft1++
        }
      } else if (bedrooms === 2) {
        totalprice2 += price
        countprice2++
        if (sqft > 0) {
          totalsqft2 += sqft
          countsqft2++
        }
      } else if (bedrooms >= 3) {
        totalprice3 += price
        countprice3++
        if (sqft > 0) {
          totalsqft3 += sqft
          countsqft3++
        }
      }
      return true
    })
  }

  const price1 = Number((totalprice1 > 0 ? totalprice1 / countprice1 : 0).toFixed())
  const price2 = Number((totalprice2 > 0 ? totalprice2 / countprice2 : 0).toFixed())
  const price3 = Number((totalprice3 > 0 ? totalprice3 / countprice3 : 0).toFixed())

  const response = {
    CTNAME: feature.properties['CTNAME'],
    CTUID: feature.properties['CTUID'],
    bedroom_1_average_price: price1,
    bedroom_1_count: countprice1,
    bedroom_1_average_sqft: Number((totalsqft1 > 0 ? totalsqft1 / countsqft1 : 0).toFixed()),
    bedroom_2_average_price: price2,
    bedroom_2_count: countprice2,
    bedroom_2_average_sqft: Number((totalsqft2 > 0 ? totalsqft2 / countsqft2 : 0).toFixed()),
    bedroom_3_average_price: price3,
    bedroom_3_count: countprice3,
    bedroom_3_average_sqft: Number((totalsqft3 > 0 ? totalsqft3 / countsqft3 : 0).toFixed())
  }

  return response
}
