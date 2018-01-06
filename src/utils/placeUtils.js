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

export const findRentResponse = (data, id) =>
  data.find(row => row['CTUID'] === id)

export const getRents = data => {
  const averageRent = {
    bachelor: data['AVERAGE_RENT_BACHELOR'],
    bedroom1: data['AVERAGE_RENT_BEDROOM_1'],
    bedroom2: data['AVERAGE_RENT_BEDROOM_2'],
    bedroom3: data['AVERAGE_RENT_BEDROOM_3_PLUS'],
    total: data['AVERAGE_RENT_TOTAL'],
  }
  const medianRent = {
    bachelor: data['MEDIAN_RENT_BACHELOR'],
    bedroom1: data['MEDIAN_RENT_BEDROOM_1'],
    bedroom2: data['MEDIAN_RENT_BEDROOM_2'],
    bedroom3: data['MEDIAN_RENT_BEDROOM_3_PLUS'],
    total: data['MEDIAN_RENT_TOTAL'],
  }
  const vacancyRate = {
    bachelor: data['VACANCY_RATE_BACHELOR'],
    bedroom1: data['VACANCY_RATE_BEDROOM_1'],
    bedroom2: data['VACANCY_RATE_BEDROOM_2'],
    bedroom3: data['VACANCY_RATE_BEDROOM_3_PLUS'],
    total: data['VACANCY_RATE_TOTAL'],
  }
  return { averageRent, medianRent, vacancyRate }
}
