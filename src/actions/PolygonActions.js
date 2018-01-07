import * as types from '../constants/ActionTypes'
import { INCOME_URL, RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { getRents } from '../utils/placeUtils'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

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

      dispatch({ type: types.UPDATE_RENT, rents })
    }
  }
}

export const updatePolgyonIds = (ctuid, ctname) => ({
  type: types.UPDATE_POLYGON_IDS,
  ctuid,
  ctname,
})

export const displayPopup = (location, layer) => (dispatch, getState) => {
  const { property, polygon, mapFeatures } = getState()
  const { map, popup, metricName, metricType } = mapFeatures
  popup.remove()
  map.getCanvas().style.cursor = ''

  const features = map.queryRenderedFeatures(location.point, {
    layers: ['census-tracts-2016geojson'],
  })
  const value = polygon[metricName][metricType]
  if (features.length > 0 && value > 0) {
    const { neighborhood } = property
    map.getCanvas().style.cursor = 'pointer'

    const popupText = `
      <div class="width-150">
        <h5>${toCAD(value)}<span> / ${metricType
      .replace('_', ' ')
      .substring(8, 9)} bdr</span></h5>
        <div>${metricName.replace('_', ' ')}</div>
        <div class="text-muted">In ${neighborhood}</div>
      </div>`
    popup
      .setLngLat(location.lngLat)
      .setHTML(popupText)
      .addTo(map)
  }
}

export const hoverPolygon = e => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map, rents, incomes } = mapFeatures
  const { properties } = e.features[0]
  const ctuid = Number(properties['CTUID']) * 100
  const ctname = properties['CTNAME']

  dispatch(displayPopup(e, 'census_tracts_2016geojson'))
  dispatch(queryNeighborhood(e))

  const rentResponse = rents.find(row => row['CTUID'] === ctname)
  if (rentResponse) {
    const rents = getRents(rentResponse)
    dispatch({ type: types.UPDATE_RENT, rents })
  } else {
    dispatch({ type: types.CLEAR_RENT })
  }

  const incomeResponse = incomes.find(row => row['ALT_GEO_CODE'] === ctuid)
  if (incomeResponse) {
    dispatch({
      type: types.UPDATE_INCOME,
      income: incomeResponse['MEDIAN_TOTAL_HOUSEHOLD_INCOME'],
    })
  } else {
    dispatch({ type: types.CLEAR_INCOME })
  }

  dispatch(updatePolgyonIds(ctuid, ctname))
}
