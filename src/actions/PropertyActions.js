import * as types from '../constants/ActionTypes'
import {
  REVERSE_GEOCODE_URL,
  PROPERTY_TAX_URL,
} from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import {
  getPropertyDescription,
  getNeighborhood,
  getCity,
} from '../utils/propertyUtils'
import {
  setSelectedProperty,
  removeSelectedProperty,
} from '../actions/SelectedProperty'

export const fetchPlace = lngLat => async dispatch => {
  const query = `${lngLat.lng},${lngLat.lat}`
  const url = `${REVERSE_GEOCODE_URL.replace(':query', query)}`
  const { json } = await apiFetch(url)
  if (json) {
    const { features } = json
    const neighborhood = getNeighborhood(features)
    const city = getCity(features)
    dispatch({ type: types.FETCH_PLACE, neighborhood, city })
  }
}

const fetchProperty = pcoord => async dispatch => {
  const url = `${PROPERTY_TAX_URL.replace(':pcoord', pcoord)}`
  const { json } = await apiFetch(url)
  if (json) {
    if (json.length > 0) {
      const pid = json[0]['PID']
      const yearBuilt = json[0]['YEAR_BUILT']
      const propertyTax = json[0]['TAX_LEVY']
      const assessmentYear = json[0]['TAX_ASSESSMENT_YEAR']
      const landAssessment = json[0]['CURRENT_LAND_VALUE']
      const buildingAssessment = json[0]['CURRENT_IMPROVEMENT_VALUE']
      const prevLandAssessment = json[0]['PREVIOUS_LAND_VALUE']
      const bigImprovYear = json[0]['BIG_IMPROVEMENT_YEAR']
      const zone = json[0]['ZONE_NAME']
      const zoneCategory = json[0]['ZONE_CATEGORY']
      const legalType = json[0]['LEGAL_TYPE']
      const totalAssessment = landAssessment + buildingAssessment
      const zoneUrl = `http://bylaws.vancouver.ca/zoning/${zone}.pdf`

      dispatch({
        type: types.FETCH_PROPERTY,
        pid,
        yearBuilt,
        propertyTax,
        assessmentYear,
        landAssessment,
        buildingAssessment,
        prevLandAssessment,
        bigImprovYear,
        zone,
        zoneUrl,
        zoneCategory,
        legalType,
        totalAssessment,
      })
    }
  }
}

export const queryNeighborhood = e => (dispatch, getState) => {
  const { map } = getState().mapFeatures
  const vanFeatures = map.queryRenderedFeatures(e.point, {
    layers: ['cov-localareasgeojson'],
  })
  if (vanFeatures.length > 0) {
    const { Name } = vanFeatures[0].properties
    dispatch({ type: types.UPDATE_NEIGHBORHOOD, neighborhood: Name })
  } else {
    dispatch({ type: types.UPDATE_NEIGHBORHOOD, neighborhood: null })
  }
}

const updateAddress = (number, street, pcoord) => ({
  type: types.UPDATE_ADDRESS,
  number,
  street,
  pcoord,
})

export const selectProperty = e => (dispatch, getState) => {
  const { map, property, selectedProperty } = getState()
  map.on('click', `properties-fill`, e => {
    const { Name, Description } = e.features[0].properties
    const layer = `properties-fill-click`
    const propDetails = getPropertyDescription(Description)
    const pcoord = selectedProperty ? selectedProperty.pcoord : null
    if (pcoord === propDetails.pcoord) {
      map.setFilter(layer, ['==', 'Name', ''])
      dispatch(removeSelectedProperty())
    } else if (Name) {
      map.setFilter(layer, ['==', 'Name', Name])
      dispatch(setSelectedProperty(property))
    }
  })
}

export const hoverProperty = e => (dispatch, getState) => {
  const { property, mapFeatures } = getState()
  const { Description } = e.features[0].properties
  const { pcoord, number, street } = getPropertyDescription(Description)
  mapFeatures.popup.remove()
  if (property.pcoord !== pcoord) {
    dispatch(updateAddress(number, street, pcoord))
    dispatch(fetchProperty(pcoord))
    dispatch(fetchPlace(e.lngLat))
  }
}
