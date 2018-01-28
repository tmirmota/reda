import * as types from '../constants/ActionTypes'
import { fetchRents } from '../actions/RentActions'

export const initMap = (map, popup) => dispatch => {
  dispatch({ type: types.SET_MAP, map, popup })
  dispatch(fetchRents())
}

export const clearState = () => ({
  type: types.RESET_STATE,
})

export const addHeatMapLayer = rents => async (dispatch, getState) => {
  const { map } = getState().mapFeatures

  if (rents) {
    const filteredRents = rents.filter(rent => rent.number_of_rentals >= 10 )
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
