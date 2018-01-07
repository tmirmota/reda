import * as types from '../constants/ActionTypes'
import { RENT_URL, INCOME_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { getMinValue, getMaxValue } from '../utils/commonUtils'
import { addHeatMapLayers } from '../utils/mapUtils'

export const clearState = () => ({
  type: types.CLEAR_STATE,
})

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}

export const storeMapnPopup = (map, popup) => ({
  type: types.SET_MAP,
  map,
  popup,
})

export const addHeatMap = (json, name, type) => (dispatch, getState) => {
  const { map } = getState().mapFeatures

  const metric = `${name}_${type}`

  const minValue = getMinValue(json, metric)
  const maxValue = getMaxValue(json, metric)

  let fillStops = [['0', 'rgba(0,0,0,0)']]
  let hoverStops = [['0', 'rgba(0,0,0,0)']]
  let beginColor
  let endColor

  json.forEach(row => {
    const value = row[metric]
    if (value > 0) {
      const percent = (value - minValue) / (maxValue - minValue)
      const percentRed = ((percent * 255 - 255) * -1).toFixed()
      const fill = `rgba(255, ${percentRed}, 0, 0.5)`
      const hover = `rgba(0, 255, 254, 0.5)`

      if (value === minValue) return (beginColor = fill)
      if (value === maxValue) return (endColor = fill)

      fillStops.push([row['CTUID'], fill])
      hoverStops.push([row['CTUID'], hover])
    }
  })

  const paint = {
    property: 'CTNAME',
    type: 'categorical',
    default: 'transparent',
    stops: fillStops,
  }

  dispatch({
    type: types.UPDATE_LEGEND,
    minValue,
    maxValue,
    beginColor,
    endColor,
  })
  const hasLayer = map.getLayer('census-tracts-fill')
  if (hasLayer) {
    map.setPaintProperty('census-tracts-fill', 'fill-color', paint)
    map.setPaintProperty('census-tracts-fill-hover', 'line-color', paint)
  } else {
    addHeatMapLayers(map, fillStops, hoverStops, 'CTNAME')
  }
}

export const fetchIncomes = features => async (dispatch, getState) => {
  let arrCtuid = []
  features.map(({ properties }) => {
    return arrCtuid.push(properties['CTUID'])
  })
  const url = `${INCOME_URL.replace(':ctuid', arrCtuid)}`
  const { json } = await apiFetch(url)
  if (json) {
    dispatch({ type: types.FETCH_INCOMES, incomes: json })
  }
}

export const fetchDataLayers = () => async (dispatch, getState) => {
  const { map, metricName, metricType } = getState().mapFeatures

  const features = map.queryRenderedFeatures({
    layers: ['census-tracts-2016geojson'],
  })
  dispatch(fetchIncomes(features))
  let arrCtnames = []
  features.map(({ properties }) => {
    return arrCtnames.push(properties['CTNAME'])
  })
  const url = `${RENT_URL.replace(':ctname', arrCtnames)}`
  const { json } = await apiFetch(url)
  if (json) {
    dispatch(addHeatMap(json, metricName, metricType))
    dispatch({ type: types.FETCH_RENTS, rents: json })
  }
}

export const changeHeatMap = event => (dispatch, getState) => {
  const { name, value } = event.target
  const { mapFeatures } = getState()
  const { map, rents } = mapFeatures

  const metricName = name === 'metricName' ? value : mapFeatures['metricName']
  const metricType = name === 'metricType' ? value : mapFeatures['metricType']

  dispatch(addHeatMap(rents, metricName, metricType))

  dispatch({ type: types.UPDATE_HEATMAP_DATA, name, value })
}
