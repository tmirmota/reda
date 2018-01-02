import { combineReducers } from 'redux'

// Reducers
import mapFeatures from './mapFeatures'
import filters from './filters'
import polygon from './polygon'
import property from './property'

const rootReducer = combineReducers({
  mapFeatures,
  filters,
  polygon,
  property,
})

export default rootReducer
