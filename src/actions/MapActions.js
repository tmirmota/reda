import * as types from '../constants/ActionTypes'
import { RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { getMinValue, getMaxValue } from '../utils/commonUtils'

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}

export const storeMapnPopup = (map, popup) => ({
  type: types.SET_MAP,
  map,
  popup,
})

export const addDataLayer = () => async (dispatch, getState) => {
  const state = getState()
  const { map } = state.mapFeatures

  const features = map.querySourceFeatures('census-tracts', {
    sourceLayer: 'census_tracts_2016geojson',
    filter: ['==', 'CMANAME', 'Vancouver'],
  })
  console.log(features)
  console.log(map.getSource('census-tracts'))

  const property = 'CTNAME'
  let ctnames = []
  features.map(({ properties }) => {
    ctnames.push(properties[property])
  })

  const url = `${RENT_URL.replace(':ctname', ctnames)}`
  const { json } = await apiFetch(url)
  if (json) {
    const metric = 'AVERAGE_RENT_TOTAL'
    const minValue = getMinValue(json, metric)
    const maxValue = getMaxValue(json, metric)

    let stops = []
    json.forEach(row => {
      var percent = (row[metric] - minValue) / (maxValue - minValue)
      const color = `rgba(124, 77, 255,${percent})`

      stops.push([row['CTUID'], color])
    })

    console.log(minValue)
    console.log(json)
    console.log(stops)

    map.addLayer(
      {
        id: `census-tracts-fill`,
        source: 'census-tracts',
        'source-layer': 'census_tracts_2016geojson',
        minzoom: 9,
        maxzoom: 14,
        type: 'fill',
        paint: {
          'fill-color': {
            property: 'CTNAME',
            type: 'categorical',
            default: 'transparent',
            stops: stops,
          },
        },
      },
      'water',
    )
    dispatch({ type: types.UPDATE_HEATMAP_DATA, heatmap: json })
  }
}
