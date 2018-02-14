import * as types from '../constants/ActionTypes'

const properties = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROPERTIES:
      return action.properties
    default:
      return state
  }
}

export default properties