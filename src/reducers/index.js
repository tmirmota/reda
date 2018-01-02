import { combineReducers } from 'redux'

// Reducers
import mapFeatures from './mapFeatures'
import filters from './filters'
import polygon from './polygon'
import property from './property'
import selectedProperty from './selectedProperty'

const rootReducer = combineReducers({
  mapFeatures,
  filters,
  polygon,
  property,
  selectedProperty,
})

export default rootReducer
