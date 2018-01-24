import { combineReducers } from 'redux'

// Reducers
import mapFeatures from './mapFeatures'
import filters from './filters'
import rent from './rent'
import rents from './rents'
import property from './property'
import selectedProperty from './selectedProperty'
import legend from './legend'

const rootReducer = combineReducers({
  mapFeatures,
  filters,
  rent,
  rents,
  property,
  selectedProperty,
  legend,
})

export default rootReducer
