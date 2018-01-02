import * as types from '../constants/ActionTypes'

const selectedProperty = (state = null, action) => {
  switch (action.type) {
    case types.SET_SELECTED_PROPERTY:
      return action.property

    case types.REMOVE_SELECTED_PROPERTY:
      return null

    default:
      return state
  }
}

export default selectedProperty
