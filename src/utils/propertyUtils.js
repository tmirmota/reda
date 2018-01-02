export const getNeighborhood = features => {
  const feature = features.find(
    ({ place_type }) => place_type[0] === 'neighborhood',
  )
  return feature ? feature.text : null
}

export const getCity = features => {
  const feature = features.find(
    ({ place_type }) => place_type[0] === 'place',
  )
  return feature ? feature.text : null
}
