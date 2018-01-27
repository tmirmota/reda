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
    const minValue = rents.reduce((min, feature) => {
      const minPrice = feature.average_price
      return minPrice !== 0 && minPrice < min ? minPrice : min
    }, 0)

    const maxValue = rents.reduce((max, feature) => {
      const maxPrice = feature.average_price
      return maxPrice > max ? maxPrice : max
    }, rents[0].average_price)

    let fillStops = []
    let beginColor
    let endColor

    rents.map(feature => {
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
      beginColor,
      endColor,
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
