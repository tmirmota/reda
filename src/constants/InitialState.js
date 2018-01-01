const initialState = {
  lat: 49.2532,
  lng: -123.1113,
  zoom: 12,
  filters: {
    zoning: false,
    satellite: false,
    transit: false,
    schools: false,
    fireHydrants: false
  },
  property: {
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
  selectedProperty: null
}

export default initialState
