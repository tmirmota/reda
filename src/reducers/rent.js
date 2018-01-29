import * as types from '../constants/ActionTypes'

const initialState = {
  name: 'Market Rental Price',
  price: null,
  count: null,
  sqft: null,
  min: null,
  max: null,
}

const rent = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_RENT:
      return {
        ...state,
        ...action.rent
      }

    case types.RESET_RENT:
      return initialState

    case types.RESET_STATE:
      return initialState

    default:
      return state
  }
}

export default rent
