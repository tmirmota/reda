import * as types from '../constants/ActionTypes'

const initialState = {
  style: 'styles/tmirmota/cjc2s1iic1pzm2sqvnkyjt06q',
  lat: 49.2532,
  lng: -123.1113,
  zoom: 12,
  maxBounds: [
    [-123.29430051866589, 49.15593259948497],
    [-122.89152688587282, 49.34756088632997],
  ],
  rents: [],
  heatmapMetric: 'AVERAGE_RENT_TOTAL',
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

    case types.FETCH_RENTS:
      return {
        ...state,
        rents: action.rents,
      }

    default:
      return state
  }
}

export default map
