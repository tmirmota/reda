import * as types from '../constants/ActionTypes'
import { apiFetch } from '../utils/apiUtils'
import { RENT_URL } from '../constants/ApiConstants'

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}

export const storeMapnPopup = (map, popup) => ({
  type: types.SET_MAP,
  map,
  popup,
})

export const heatmap = () => async (dispatch, getState) => {
  const state = getState()
  const { map } = state.mapFeatures
  const features = map.queryRenderedFeatures({ layers: ['census-tracts-fill'] })
  let ctnames = []
  features.map(({ properties }) => {
    ctnames.push(properties['CTNAME'])
  })

  const url = `${RENT_URL.replace(':ctname', ctnames)}`
  const { json } = apiFetch(url)
  if (json) {
    console.log(json)
  }
}
