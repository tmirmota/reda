import * as types from '../constants/ActionTypes'

const initialState = {
  bedrooms: [
    {num: 1, value: true },
    {num: 2, value: false },
    {num: 3, value: false }
  ],
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
      const { name, num, value } = action
      return {
        ...state,
        [name]: state[name].map(metric => {
          if (metric.num === num) {
            return {num, value}
          } else {
            return metric
          }
        })
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
