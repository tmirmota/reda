import * as types from '../constants/ActionTypes'
import { HOUSEHOLD_INCOME_URL, RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { fetchPlace } from '../actions/PropertyActions'

export const fetchIncome = ctuid => async dispatch => {
  const url = `${HOUSEHOLD_INCOME_URL.replace(':id', ctuid)}`
  const { json } = await apiFetch(url)
  if (json) {
    if (json.length > 0) {
      const altGeoCode = json[0]['ALT_GEO_CODE']
      const medianTotalHouseholdIncome =
        json[0]['MEDIAN_TOTAL_HOUSEHOLD_INCOME']
      dispatch({
        type: types.FETCH_INCOME,
        altGeoCode,
        medianTotalHouseholdIncome,
      })
    }
  }
}

export const fetchRent = ctuid => async dispatch => {
  const url = `${RENT_URL.replace(':id', ctuid)}`
  const { json } = await apiFetch(url)
  if (json) {
    if (json.length > 0) {
      const averageRent = {
        bachelor: json[0]['AVERAGE_RENT_BACHELOR'],
        bedroom1: json[0]['AVERAGE_RENT_BEDROOM_1'],
        bedroom2: json[0]['AVERAGE_RENT_BEDROOM_2'],
        bedroom3: json[0]['AVERAGE_RENT_BEDROOM_3_PLUS'],
        total: json[0]['AVERAGE_RENT_TOTAL'],
      }
      const medianRent = {
        bachelor: json[0]['MEDIAN_RENT_BACHELOR'],
        bedroom1: json[0]['MEDIAN_RENT_BEDROOM_1'],
        bedroom2: json[0]['MEDIAN_RENT_BEDROOM_2'],
        bedroom3: json[0]['MEDIAN_RENT_BEDROOM_3_PLUS'],
        total: json[0]['MEDIAN_RENT_TOTAL'],
      }
      const vacancyRate = {
        bachelor: json[0]['VACANCY_RATE_BACHELOR'],
        bedroom1: json[0]['VACANCY_RATE_BEDROOM_1'],
        bedroom2: json[0]['VACANCY_RATE_BEDROOM_2'],
        bedroom3: json[0]['VACANCY_RATE_BEDROOM_3_PLUS'],
        total: json[0]['VACANCY_RATE_TOTAL'],
      }
      dispatch({ type: types.FETCH_RENT, averageRent, medianRent, vacancyRate })
    }
  }
}

export const updatePolgyonIds = (ctuid, ctname) => ({
  type: types.UPDATE_POLYGON_IDS,
  ctuid,
  ctname,
})

export const hoverPolygon = e => (dispatch, getState) => {
  const { polygon } = getState()
  const { properties } = e.features[0]
  const ctuid = properties['CTUID']
  const ctname = properties['CTNAME']

  if (polygon.ctuid !== ctuid) {
    dispatch(fetchIncome(ctuid))
    dispatch(fetchPlace(e.lngLat))
    dispatch(fetchRent(ctname))
  }

  dispatch(updatePolgyonIds(ctuid, ctname))
}
