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
