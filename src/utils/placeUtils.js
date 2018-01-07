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

export const getRents = data => {
  const averageRent = {
    BACHELOR: data['AVERAGE_RENT_BACHELOR'],
    BEDROOM_1: data['AVERAGE_RENT_BEDROOM_1'],
    BEDROOM_2: data['AVERAGE_RENT_BEDROOM_2'],
    BEDROOM_3_PLUS: data['AVERAGE_RENT_BEDROOM_3_PLUS'],
    total: data['AVERAGE_RENT_TOTAL'],
  }
  const medianRent = {
    BACHELOR: data['MEDIAN_RENT_BACHELOR'],
    BEDROOM_1: data['MEDIAN_RENT_BEDROOM_1'],
    BEDROOM_2: data['MEDIAN_RENT_BEDROOM_2'],
    BEDROOM_3_PLUS: data['MEDIAN_RENT_BEDROOM_3_PLUS'],
    total: data['MEDIAN_RENT_TOTAL'],
  }
  const vacancyRate = {
    BACHELOR: data['VACANCY_RATE_BACHELOR'],
    BEDROOM_1: data['VACANCY_RATE_BEDROOM_1'],
    BEDROOM_2: data['VACANCY_RATE_BEDROOM_2'],
    BEDROOM_3_PLUS: data['VACANCY_RATE_BEDROOM_3_PLUS'],
    total: data['VACANCY_RATE_TOTAL'],
  }
  return { averageRent, medianRent, vacancyRate }
}
