import * as types from '../constants/ActionTypes'

const initialState = {
  bedrooms: [1],
  redoSearch: false
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MAP:
      return {
        ...state,
        map: action.map,
        popup: action.popup,
      }

    case types.UPDATE_METRIC:
      return {
        ...state,
        [action.name]: action.value,
      }
    
    case types.SHOW_REDO_SEARCH:
      return {
        ...state,
        redoSearch: true
      }
    
    case types.HIDE_REDO_SEARCH:
      return {
        ...state,
        redoSearch: false
      }
    
    default:
      return state
  }
}

export default map
