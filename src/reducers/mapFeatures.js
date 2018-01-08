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
  metricType: 'BEDROOM_1',
  metricName: 'AVERAGE',
  identifier: 'CTNAME',
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

    case types.UPDATE_RENTS:
      return {
        ...state,
        rents: action.rents,
      }

    case types.UPDATE_HEATMAP_DATA:
      return {
        ...state,
        [action.name]: action.value,
      }

    default:
      return state
  }
}

export default map
