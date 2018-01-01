const initialState = {
  lat: 49.2532,
  lng: -123.1113,
  zoom: 17,
  filters: {
    zoning: false,
    satellite: false,
    transit: false,
    schools: false,
    fireHydrants: false
  },
  property: {
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
    pcoord: null
  },
  selectedProperty: null,
  ct: {
    ctuid: null,
    ctname: null,
    altGeoCode: null,
    medianTotalHouseholdIncome: null,
    averageRent: {
      bachelor: null,
      bedroom1: null,
      bedroom2: null,
      bedroom3: null,
      total: null
    },
    medianRent: {
      bachelor: null,
      bedroom1: null,
      bedroom2: null,
      bedroom3: null,
      total: null
    },
    vacancyRate: {
      bachelor: null,
      bedroom1: null,
      bedroom2: null,
      bedroom3: null,
      total: null
    }
  }
}

export default initialState
