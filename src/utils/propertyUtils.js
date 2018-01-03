export const getNeighborhood = features => {
  const feature = features.find(
    ({ place_type }) => place_type[0] === 'neighborhood',
  )
  return feature ? feature.text : null
}

export const getCity = features => {
  const feature = features.find(({ place_type }) => place_type[0] === 'place')
  return feature ? feature.text : null
}

export const getPropertyDescription = Description => {
  const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
  const indexStdStreet = Description.indexOf('STD_STREET:')
  const indexPcoord = Description.indexOf('PCOORD:')
  const indexSiteId = Description.indexOf('SITE_ID:')
  const pcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)
  const number = Description.substring(indexCivicNum + 13, indexStdStreet - 1)
  const street = Description.substring(indexStdStreet + 11, indexPcoord - 1)
  return { pcoord, number, street }
}
