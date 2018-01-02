import * as types from '../constants/ActionTypes'

const initialState = {
  zoning: false,
  satellite: false,
  transit: false,
  schools: false,
  fireHydrants: false,
}

const filters = (state = initialState, action) => {
  switch (action.types) {
    default:
      return state
  }
}

export default filters
