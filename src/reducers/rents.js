import * as types from '../constants/ActionTypes'

const rents = (state = null, action) => {
  switch(action.type) {
    case types.FETCH_RENTS:  
      return action.rents

    default:
      return state
  }
}

export default rents