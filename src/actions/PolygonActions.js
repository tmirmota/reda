import * as types from '../constants/ActionTypes'
import { INCOME_URL, RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { fetchPlace } from '../actions/PropertyActions'
import { findRentResponse, getRents } from '../utils/placeUtils'

export const fetchIncome = ctuid => async dispatch => {
  const url = `${INCOME_URL.replace(':id', ctuid)}`
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
      const rents = getRents(json[0])

      dispatch({ type: types.FETCH_RENT, rents })
    }
  }
}

export const updatePolgyonIds = (ctuid, ctname) => ({
  type: types.UPDATE_POLYGON_IDS,
  ctuid,
  ctname,
})

export const hoverPolygon = e => (dispatch, getState) => {
  const { polygon, mapFeatures } = getState()
  const { properties } = e.features[0]
  const ctuid = properties['CTUID']
  const ctname = properties['CTNAME']
  console.log(mapFeatures)

  const rentResponse = findRentResponse(mapFeatures.rents, ctname)
  if (rentResponse) {
    const rents = getRents(rentResponse)
    dispatch({ type: types.UPDATE_RENT, rents })
  }

  // if (polygon.ctuid !== ctuid) {
  //   dispatch(fetchIncome(ctuid))
  //   dispatch(fetchPlace(e.lngLat))
  //   dispatch(fetchRent(ctname))
  // }

  dispatch(updatePolgyonIds(ctuid, ctname))
}
