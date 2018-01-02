import * as types from '../constants/ActionTypes'

const initialState = {
  style: 'styles/mapbox/basic-v9',
  lat: 49.2532,
  lng: -123.1113,
  zoom: 17,
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

    default:
      return state
  }
}

export default map
