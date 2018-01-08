import * as types from '../constants/ActionTypes'

const initialState = {
  zoning: false,
  satellite: false,
  transit: false,
  schools: false,
  fireHydrants: false,
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_FILTER:
      return {
        ...state,
        [action.name]: action.checked,
      }

    default:
      return state
  }
}

export default filters
