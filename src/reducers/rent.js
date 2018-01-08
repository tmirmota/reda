import * as types from '../constants/ActionTypes'

const initialState = {
  price: null,
  count: null,
}

const rent = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_RENT:
      return {
        price: action.rent.price,
        count: action.rent.count,
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
