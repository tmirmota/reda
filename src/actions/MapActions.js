import * as types from '../constants/ActionTypes'
import { RENT_URL } from '../constants/ApiConstants'
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

export const addHeatMap = json => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map, heatmapMetric } = mapFeatures
  const minValue = getMinValue(json, heatmapMetric)
  const maxValue = getMaxValue(json, heatmapMetric)

  let fillStops = []
  let hoverStops = []
  json.forEach(row => {
    const percent =
      row[heatmapMetric] > 0
        ? (row[heatmapMetric] - minValue) / (maxValue - minValue)
        : 0
    const percentRed = (percent * 255 - 255) * -1
    const showPercent = percent > 0 ? 0.5 : 0

    const fill = `rgba(255, ${percentRed}, 0, ${showPercent})`
    const hover = `rgba(0, 255, 254, ${showPercent})`

    fillStops.push([row['CTUID'], fill])
    hoverStops.push([row['CTUID'], hover])
  })
  addHeatMapLayers(map, fillStops, hoverStops, 'CTNAME')
}

export const fetchDataLayers = () => async (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map, heatmapMetric } = mapFeatures

  const features = map.queryRenderedFeatures({
    layers: ['census-tracts-2016geojson'],
  })
  let arrCtnames = []
  features.map(({ properties }) => {
    arrCtnames.push(properties['CTNAME'])
  })
  const url = `${RENT_URL.replace(':ctname', arrCtnames)}`
  const { json } = await apiFetch(url)
  if (json) {
    dispatch(addHeatMap(json))
    dispatch({ type: types.FETCH_RENTS, rents: json })
  }
}
