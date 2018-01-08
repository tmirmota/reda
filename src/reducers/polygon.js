import * as types from '../constants/ActionTypes'

const initialState = {
  ctuid: null,
  ctname: null,
  altGeoCode: null,
  AVERAGE_RENT: {
    BEDROOM_1: null,
    BEDROOM_2: null,
    BEDROOM_3_PLUS: null,
  },
  MEDIAN_RENT: {
    BEDROOM_1: null,
    BEDROOM_2: null,
    BEDROOM_3_PLUS: null,
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

    case types.UPDATE_RENT:
      return {
        ...state,
        AVERAGE_RENT: action.rents.averageRent,
        MEDIAN_RENT: action.rents.medianRent,
        VACANCY_RATE: action.rents.vacancyRate,
      }

    case types.UPDATE_INCOME:
      return {
        ...state,
        medianTotalHouseholdIncome: action.income,
      }

    case types.UPDATE_POLYGON_IDS:
      return {
        ...state,
        ctuid: action.ctuid,
        ctname: action.ctname,
      }

    case types.CLEAR_RENT:
      return {
        ...state,
        averageRent: initialState.averageRent,
        medianRent: initialState.medianRent,
        vacancyRate: initialState.vacancyRate,
      }

    case types.CLEAR_INCOME:
      return {
        ...state,
        medianTotalHouseholdIncome: null,
      }

    case types.CLEAR_STATE:
      return initialState

    default:
      return state
  }
}

export default polygon
