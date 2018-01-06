import { combineReducers } from 'redux'

// Reducers
import mapFeatures from './mapFeatures'
import filters from './filters'
import polygon from './polygon'
import property from './property'
import selectedProperty from './selectedProperty'
import legend from './legend'

const rootReducer = combineReducers({
  mapFeatures,
  filters,
  polygon,
  property,
  selectedProperty,
  legend,
})

export default rootReducer
