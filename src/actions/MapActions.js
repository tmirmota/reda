import * as types from '../constants/ActionTypes'
import { CTS_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { fetchRents } from '../actions/RentActions'

export const clearState = () => ({
  type: types.RESET_STATE
})

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}

export const storeMapnPopup = (map, popup) => ({
  type: types.SET_MAP,
  map,
  popup
})

export const addHeatMapLayer = () => async (dispatch, getState) => {
  const { map, bedrooms } = getState().mapFeatures

  const bounds = map.getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const url = `${CTS_URL}?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${
    ne.lng
  }&nelat=${ne.lat}&bedrooms=${bedrooms}`

  const { json } = await apiFetch(url)

  if (json) {
    const minValue = json.reduce((min, feature) => {
      const minPrice = feature.average_price
      return minPrice !== 0 && minPrice < min ? minPrice : min
    }, 0)

    const maxValue = json.reduce((max, feature) => {
      const maxPrice = feature.average_price
      return maxPrice > max ? maxPrice : max
    }, json[0].average_price)

    let fillStops = []
    let beginColor
    let endColor

    json.map(feature => {
      const value = feature.average_price
      if (value > 0) {
        const percent = Math.min((value - minValue) / (maxValue - minValue), 1)
        const percentRed = ((percent * 255 - 255) * -1).toFixed()
        const fill = `rgba(255, ${percentRed}, 0, .7)`

        if (value === minValue) return (beginColor = fill)
        if (value === maxValue) return (endColor = fill)

        const hasValue = fillStops.filter(stop => stop[0] === value)
        if (hasValue.length <= 0) {
          fillStops.push([feature.ctuid, fill])
        }
      }
      return true
    })

    const paint = {
      property: 'CTUID',
      type: 'categorical',
      default: 'transparent',
      stops: fillStops
    }

    map.setPaintProperty('census-tracts-2016geojson', 'fill-opacity', 1)
    map.setPaintProperty('census-tracts-2016geojson', 'fill-color', paint)
    map.setPaintProperty(
      'census-tracts-2016geojson',
      'fill-outline-color',
      paint
    )

    dispatch({
      type: types.UPDATE_LEGEND,
      beginColor,
      endColor,
      minValue,
      maxValue
    })
    dispatch({ type: types.HIDE_REDO_SEARCH })
  }
}

export const changeMetric = value => (dispatch, getState) => {
  const metric = `bedroom_${value}_average_price`
  dispatch(addHeatMapLayer(metric))
  dispatch({ type: types.UPDATE_METRIC, name: 'bedrooms', value })
}

export const showRedoSearch = () => ({ type: types.SHOW_REDO_SEARCH })
