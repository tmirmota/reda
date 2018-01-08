import * as types from '../constants/ActionTypes'
import { polygon, pointsWithinPolygon } from '@turf/turf'

import { getMinValue, getMaxValue } from '../utils/commonUtils'
import { addHeatMapLayers } from '../utils/mapUtils'
import { getRent } from '../utils/placeUtils'

export const clearState = () => ({
  type: types.RESET_STATE,
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

export const addHeatMap = (
  rents,
  metricName = 'AVERAGE',
  metricType = 'BEDROOM_1',
) => (dispatch, getState) => {
  const { map } = getState().mapFeatures

  const metric = `${metricName}_${metricType}`

  let fillStops = [['0', 'rgba(0,0,0,0)']]
  let hoverStops = [['0', 'rgba(0,0,0,0)']]
  let beginColor
  let endColor

  const minValue = getMinValue(rents, metric)
  const maxValue = getMaxValue(rents, metric)

  rents.map(polygon => {
    const value = polygon[metric]
    const ctname = polygon['CTNAME']

    if (value > 0) {
      const percent = (value - minValue) / (maxValue - minValue)
      const percentRed = ((percent * 255 - 255) * -1).toFixed()
      const fill = `rgba(255, ${percentRed}, 0, 0.5)`
      const hover = `rgba(0, 255, 254, 0.5)`

      if (value === minValue) return (beginColor = fill)
      if (value === maxValue) return (endColor = fill)

      const hasName = fillStops.filter(stop => stop[0] === ctname)
      if (hasName.length <= 0) {
        fillStops.push([ctname, fill])
        hoverStops.push([ctname, hover])
      }
    }
    return true
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

export const fetchDataLayers = () => async (dispatch, getState) => {
  const { map } = getState().mapFeatures

  const craigslistFeatures = map.queryRenderedFeatures({
    layers: ['craigslist-van-rentals-data-2-d5abc4'],
  })

  const polygonFeatures = map.queryRenderedFeatures({
    layers: ['census-tracts-2016geojson'],
  })

  let rents = []

  polygonFeatures.map(feature => {
    const { coordinates } = feature.geometry
    if (coordinates[0].length >= 4) {
      const rentalPoints = {
        type: 'FeatureCollection',
        features: craigslistFeatures,
      }
      const searchWithin = polygon([coordinates[0]])
      const ptsWithin = pointsWithinPolygon(rentalPoints, searchWithin)

      const rentals = ptsWithin.features

      const rent = getRent(rentals, feature)
      rents.push(rent)
    }
    return true
  })

  dispatch(addHeatMap(rents))
  dispatch({ type: types.UPDATE_RENTS, rents })
}

export const changeHeatMap = event => (dispatch, getState) => {
  const { name, value } = event.target
  const { mapFeatures } = getState()
  const { rents } = mapFeatures

  const metricName = name === 'metricName' ? value : mapFeatures['metricName']
  const metricType = name === 'metricType' ? value : mapFeatures['metricType']

  dispatch(addHeatMap(rents, metricName, metricType))
  dispatch({ type: types.UPDATE_HEATMAP_DATA, name, value })
}
