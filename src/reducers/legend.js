import * as types from '../constants/ActionTypes'

const initialState = {
  minValue: null,
  maxValue: null,
  beginColor: 'rgba(255, 255, 0, .7)',
  endColor: 'rgba(255, 0, 0, .7)',
}

const legend = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LEGEND:
      return { ...state, ...action, }

    case types.UPDATE_MINMAX:
      return {
        ...state,
        minValue: action.minValue,
        maxValue: action.maxValue,
      }

    default:
      return state
  }
}

export default legend
