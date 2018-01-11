import * as types from '../constants/ActionTypes'
import { polygon, pointsWithinPolygon } from '@turf/turf'

import { getRent } from '../utils/placeUtils'
import { rentLayerID } from '../constants/MapConstants'

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

export const fetchDataLayers = map => dispatch => {
  const rentalFeatures = map.queryRenderedFeatures({
    layers: ['rentals']
  })

  const polygonFeatures = map.queryRenderedFeatures({
    layers: [rentLayerID]
  })

  let rents = []
  let newFeatures = []
  let total = 0

  polygonFeatures.map(feature => {
    const { coordinates } = feature.geometry
    if (coordinates[0].length >= 4) {
      const rentalPoints = {
        type: 'FeatureCollection',
        features: rentalFeatures
      }
      let searchWithin = polygon([coordinates[0]])

      const ptsWithin = pointsWithinPolygon(rentalPoints, searchWithin)
      const rentals = ptsWithin.features

      total += rentals.length

      const rent = getRent(rentals, feature)

      if (rent.bedroom_1_average_price === 0 && rent.bedroom_1_count > 0) {
        console.log(rentals);
        console.log(rent);
      }

      searchWithin.properties = rent
      newFeatures.push(searchWithin)
      rents.push(rent)
    }
    return true
  })

  // console.log("Rental Features: ", rentalFeatures);
  
  console.log("Total Loop: ", total);
  // console.log("Rents: ", rents);
  
  // console.log(JSON.stringify(newFeatures))
}

export const addHeatMapLayer = metric => (dispatch, getState) => {
  const { map } = getState().mapFeatures
  const features = map.queryRenderedFeatures({
    layers: [rentLayerID]
  })

  const minValue = features.reduce((min, feature) => {
    const price = feature.properties[metric]
    return price !== 0 && price < min ? price : min
  }, 3000)
  const maxValue = features.reduce((max, feature) => {
    const price = feature.properties[metric]
    return price > max ? price : max
  }, features[0].properties[metric])

  let fillStops = [[0,'rgba(0,0,0,0)']]
  let beginColor
  let endColor
  features.map(feature => {
    const value = feature.properties[metric]
    if (value > 0) {
      const percent = (value - minValue) / (maxValue - minValue)
      const percentRed = ((percent * 255 - 255) * -1).toFixed()
      const fill = `rgba(255, ${percentRed}, 0, 0.5)`

      if (value === minValue) return (beginColor = fill)
      if (value === maxValue) return (endColor = fill)

      const hasValue = fillStops.filter(stop => stop[0] === value)
      if (hasValue.length <= 0) {
        fillStops.push([value, fill])
      }
    }
    return true
  })

  fillStops.sort((a, b) => {
    if (a[0] === b[0]) {
      return 0
    } else {
      return a[0] < b[0] ? -1 : 1
    }
  })
  const paint = {
    property: metric,
    type: 'exponential',
    default: 'transparent',
    stops: fillStops
  }

  const hasLayer = map.getLayer(rentLayerID)
  if (hasLayer) {
    console.log('Applied heatmap layer');
    map.setPaintProperty(rentLayerID, 'fill-opacity', 0.2)
    map.setPaintProperty(rentLayerID, 'fill-color', paint)
    map.setPaintProperty(rentLayerID, 'fill-outline-color', paint)
  }
  dispatch({ type: types.UPDATE_LEGEND, beginColor, endColor, minValue, maxValue })
}

export const changeMetric = (value) => (dispatch, getState) => {
  const metric = `bedroom_${value}_average_price`
  dispatch(addHeatMapLayer(metric))
  dispatch({ type: types.UPDATE_METRIC, name: 'bedrooms', value })
}

export const removeSurvey = () => ({
  type: types.REMOVE_SURVEY
})