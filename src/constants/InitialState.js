const initialState = {
  lat: 49.2532,
  lng: -123.1113,
  lngLat: null,
  zoom: 17,
  filters: {
    zoning: false,
    satellite: false
  },
  location: {
    number: null,
    street: null,
    neighborhood: null,
    city: null
  },
  property: {
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
  }
}

export default initialState
