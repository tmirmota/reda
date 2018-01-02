import * as types from '../constants/ActionTypes'
import { getNeighborhood, getCity } from '../utils/propertyUtils'
import {
  REVERSE_GEOCODE_URL,
  LAND_COORD_URL,
  HOUSEHOLD_INCOME_URL,
} from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'

export const fetchPlace = lngLat => async dispatch => {
  const query = `${lngLat.lng},${lngLat.lat}`
  const url = `${REVERSE_GEOCODE_URL.replace(':query', query)}`
  const { json } = await apiFetch(url)
  if (json) {
    const { features } = json
    const neighborhood = getNeighborhood(features)
    const city = getCity(features)
    dispatch({ type: types.FETCH_PLACE, neighborhood, city })
  }
}

export const fetchProperty = pcoord => async dispatch => {
  const url = `${LAND_COORD_URL.replace(':id', pcoord)}`
  const { json } = await apiFetch(url)
  if (json) {
    if (json.length > 0) {
      const pid = json[0]['PID']
      const yearBuilt = json[0]['YEAR_BUILT']
      const propertyTax = json[0]['TAX_LEVY']
      const assessmentYear = json[0]['TAX_ASSESSMENT_YEAR']
      const landAssessment = json[0]['CURRENT_LAND_VALUE']
      const buildingAssessment = json[0]['CURRENT_IMPROVEMENT_VALUE']
      const prevLandAssessment = json[0]['PREVIOUS_LAND_VALUE']
      const bigImprovYear = json[0]['BIG_IMPROVEMENT_YEAR']
      const zone = json[0]['ZONE_NAME']
      const zoneCategory = json[0]['ZONE_CATEGORY']
      const legalType = json[0]['LEGAL_TYPE']
      const totalAssessment = landAssessment + buildingAssessment
      const zoneUrl = `http://bylaws.vancouver.ca/zoning/${zone}.pdf`

      dispatch({
        type: types.FETCH_PROPERTY,
        pid,
        yearBuilt,
        propertyTax,
        assessmentYear,
        landAssessment,
        buildingAssessment,
        prevLandAssessment,
        bigImprovYear,
        zone,
        zoneUrl,
        zoneCategory,
        legalType,
        totalAssessment,
      })
    }
  }
}

export const updateAddress = (number, street, pcoord) => ({
  type: types.UPDATE_ADDRESS,
  number,
  street,
  pcoord,
})
