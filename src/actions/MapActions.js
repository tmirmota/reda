import * as types from '../constants/ActionTypes'
import { fetchRents } from '../actions/RentActions'
import { apiFetch } from '../utils/apiUtils'
import { ADDRESS_SEARCH_URL } from '../constants/ApiConstants'

export const initMap = (map, popup) => dispatch => {
  dispatch({ type: types.SET_MAP, map, popup })
  dispatch(fetchRents())
}

export const clearState = () => ({
  type: types.RESET_STATE,
})

export const geoCodeResult = result => async (dispatch, getState) => {
  const { map } = getState().mapFeatures
  const place_type = result.place_type[0]
  if (place_type === 'address') {
    const { address, center } = result

    const url = `${ADDRESS_SEARCH_URL}?address=${address}&long=${
      center[0]
    }&lat=${center[1]}`

    const { json } = await apiFetch(url)
    if (json.length > 1) {
      console.log(json)
      dispatch({ type: types.FETCH_PROPERTIES, properties: json })
    }

    map.getSource('search-point').setData(result.geometry)
  }
}

export const addHeatMapLayer = rents => async (dispatch, getState) => {
  const { map } = getState().mapFeatures

  if (rents) {
    const filteredRents = rents.filter(rent => rent.number_of_rentals >= 5)
    const minValue = filteredRents.reduce((min, feature) => {
      const minPrice = feature.average_price
      return minPrice !== 0 && minPrice < min ? minPrice : min
    }, 5000)

    const maxValue = filteredRents.reduce((max, feature) => {
      const maxPrice = feature.average_price
      return maxPrice > max ? maxPrice : max
    }, filteredRents[0].average_price)

    let fillStops = []

    filteredRents.map(feature => {
      const value = feature.average_price
      if (value > 0) {
        const percent = (value - minValue) / (maxValue - minValue)
        let percentRed = ((percent * 255 - 255) * -1).toFixed()

        const fill = `rgba(255, ${percentRed}, 0, .7)`

        fillStops.push([feature.ctuid, fill])
      }
      return true
    })

    const paint = {
      property: 'CTUID',
      type: 'categorical',
      default: 'transparent',
      stops: fillStops,
    }

    map.setPaintProperty('census-tracts-2016geojson', 'fill-opacity', 1)
    map.setPaintProperty('census-tracts-2016geojson', 'fill-color', paint)
    map.setPaintProperty(
      'census-tracts-2016geojson',
      'fill-outline-color',
      paint,
    )

    dispatch({
      type: types.UPDATE_LEGEND,
      minValue,
      maxValue,
    })
    dispatch({ type: types.HIDE_REDO_SEARCH })
  }
}

export const changeMetric = (name, metric) => dispatch => {
  dispatch({ type: types.UPDATE_METRIC, name, ...metric })
  dispatch(fetchRents())
}

export const showRedoSearch = () => ({ type: types.SHOW_REDO_SEARCH })
