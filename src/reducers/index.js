import { combineReducers } from 'redux'

// Reducers
import mapFeatures from './mapFeatures'
import filters from './filters'
import rent from './rent'
import property from './property'
import selectedProperty from './selectedProperty'
import legend from './legend'

const rootReducer = combineReducers({
  mapFeatures,
  filters,
  rent,
  property,
  selectedProperty,
  legend,
})

export default rootReducer
