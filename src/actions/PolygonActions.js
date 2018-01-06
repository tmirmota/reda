import * as types from '../constants/ActionTypes'
import { INCOME_URL, RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { fetchPlace } from '../actions/PropertyActions'
import { getRents } from '../utils/placeUtils'

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
  const { rents, incomes } = mapFeatures
  const { properties } = e.features[0]
  const ctuid = Number(properties['CTUID']) * 100
  const ctname = properties['CTNAME']

  const rentResponse = rents.find(row => row['CTUID'] === ctname)
  if (rentResponse) {
    const rents = getRents(rentResponse)
    dispatch({ type: types.UPDATE_RENT, rents })
  } else {
    dispatch({ type: types.CLEAR_RENT })
  }

  console.log(properties)
  console.log(incomes)
  const incomeResponse = incomes.find(row => row['ALT_GEO_CODE'] === ctuid)
  if (incomeResponse) {
    dispatch({
      type: types.UPDATE_INCOME,
      income: incomeResponse['MEDIAN_TOTAL_HOUSEHOLD_INCOME'],
    })
  } else {
    dispatch({ type: types.CLEAR_INCOME })
  }

  // if (polygon.ctuid !== ctuid) {
  //   dispatch(fetchIncome(ctuid))
  //   dispatch(fetchPlace(e.lngLat))
  //   dispatch(fetchRent(ctname))
  // }

  dispatch(updatePolgyonIds(ctuid, ctname))
}
