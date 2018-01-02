import * as types from '../constants/ActionTypes'

const initialState = {
  ctuid: null,
  ctname: null,
  altGeoCode: null,
  medianTotalHouseholdIncome: null,
  averageRent: {
    bachelor: null,
    bedroom1: null,
    bedroom2: null,
    bedroom3: null,
    total: null,
  },
  medianRent: {
    bachelor: null,
    bedroom1: null,
    bedroom2: null,
    bedroom3: null,
    total: null,
  },
  vacancyRate: {
    bachelor: null,
    bedroom1: null,
    bedroom2: null,
    bedroom3: null,
    total: null,
  },
}

const polygon = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INCOME:
      return {
        ...state,
        altGeoCode: action.altGeoCode,
        medianTotalHouseholdIncome: action.medianTotalHouseholdIncome,
      }

    case types.FETCH_RENT:
      return {
        ...state,
        averageRent: action.averageRent,
        medianRent: action.medianRent,
        vacancyRate: action.vacancyRate,
      }

    case types.UPDATE_POLYGON_IDS:
      return {
        ...state,
        ctuid: action.ctuid,
        ctname: action.ctname,
      }

    default:
      return state
  }
}

export default polygon
