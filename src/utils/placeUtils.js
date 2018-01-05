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

export const getRent = (data, id) => {
  const polygon = data.find(row => row['CTUID'] === id)
  return polygon ? polygon['AVERAGE_RENT_TOTAL'] : 0
}
