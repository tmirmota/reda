import * as types from '../constants/ActionTypes'

export const setSelectedProperty = property => ({
  type: types.SET_SELECTED_PROPERTY,
  property,
})

export const removeSelectedProperty = () => ({
  type: types.REMOVE_SELECTED_PROPERTY,
})
