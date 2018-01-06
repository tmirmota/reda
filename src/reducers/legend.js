import * as types from '../constants/ActionTypes'

const legend = (state = null, action) => {
  switch (action.type) {
    case types.UPDATE_LEGEND:
      return {
        minValue: action.minValue,
        maxValue: action.maxValue,
        beginColor: action.beginColor,
        endColor: action.endColor,
      }

    default:
      return state
  }
}

export default legend
