import * as types from '../constants/ActionTypes'

const initialState = {
  minValue: null,
  maxValue: null,
  beginColor: '#ffff00',
  endColor: '#dd2c00'
}

const legend = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LEGEND:
      return {
        minValue: action.minValue,
        maxValue: action.maxValue,
        beginColor: action.beginColor,
        endColor: action.endColor,
      }

    case types.UPDATE_MINMAX: 
      return {
        ...state,
        minValue: action.minValue,
        maxValue: action.maxValue
      }

    default:
      return state
  }
}

export default legend
