import * as types from '../constants/ActionTypes'

const initialState = {
  style: 'styles/tmirmota/cjc9z5vs60eo82rloxm41wx5o',
  lat: 49.261069,
  lng: -123.1427207,
  zoom: 12,
  maxBounds: [
    [-123.29430051866589, 49.15593259948497],
    [-122.89152688587282, 49.34756088632997],
  ],
  survay: 'Survay',
  bedrooms: 1
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

    case types.UPDATE_METRIC:
      return {
        ...state,
        [action.name]: action.value,
      }
    
      case types.REMOVE_SURVEY:
        return {
          ...state,
          survay: ''
        }

    default:
      return state
  }
}

export default map
