import * as types from '../constants/ActionTypes'

const initialState = {
  pid: null,
  number: null,
  street: null,
  neighborhood: null,
  city: null,
  yearBuilt: null,
  propertyTax: null,
  assessmentYear: null,
  totalAssessment: null,
  landAssessment: null,
  buildingAssessment: null,
  prevLandAssessment: null,
  bigImprovYear: null,
  zone: null,
  zoneUrl: null,
  zoneCategory: null,
  legalType: null,
  pcoord: null,
}

const property = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ADDRESS:
      return {
        ...state,
        pcoord: action.pcoord,
        number: action.number,
        street: action.street,
      }

    case types.FETCH_PLACE:
      return {
        ...state,
        neighborhood: action.neighborhood,
        city: action.city,
      }

    case types.FETCH_PROPERTY:
      return {
        ...state,
        pid: action.pid,
        yearBuilt: action.yearBuilt,
        propertyTax: action.propertyTax,
        assessmentYear: action.assessmentYear,
        landAssessment: action.landAssessment,
        buildingAssessment: action.buildingAssessment,
        prevLandAssessment: action.prevLandAssessment,
        bigImprovYear: action.bigImprovYear,
        zone: action.zone,
        zoneUrl: action.zoneUrl,
        zoneCategory: action.zoneCategory,
        legalType: action.legalType,
        totalAssessment: action.totalAssessment,
      }

    case types.UPDATE_NEIGHBORHOOD:
      return {
        ...state,
        neighborhood: action.neighborhood,
      }

    case types.CLEAR_STATE:
      return initialState

    default:
      return state
  }
}

export default property
