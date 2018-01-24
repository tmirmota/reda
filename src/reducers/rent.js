import * as types from '../constants/ActionTypes'

const initialState = {
  price: null,
  count: null,
  sqft: null
}

const rent = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_RENT:
      return action.rent

    case types.RESET_RENT:
      return initialState

    case types.RESET_STATE:
      return initialState

    default:
      return state
  }
}

export default rent
