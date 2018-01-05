import * as types from '../constants/ActionTypes'

const initialState = {
  style: 'styles/tmirmota/cjc1ae7vs0io22sog6quhhyd2',
  lat: 49.2532,
  lng: -123.1113,
  zoom: 12,
  maxBounds: [
    [-123.29430051866589, 49.15593259948497],
    [-122.89152688587282, 49.34756088632997],
  ],
  heatmap: [],
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MAP:
      return {
        ...state,
        map: action.map,
        popup: action.popup,
      }

    case types.UPDATE_COORDINATES:
      const { lat, lng, zoom } = action
      return {
        ...state,
        lat,
        lng,
        zoom,
      }

    case types.UPDATE_HEATMAP_DATA:
      return {
        ...state,
        heatmap: action.heatmap,
      }

    default:
      return state
  }
}

export default map
