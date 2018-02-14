export const initialMap = {
  style: 'mapbox://styles/tmirmota/cjd9licqs57do2rvhpfbna5p7',
  center: [-123.1427207, 49.261069],
  zoom: 11,
  // maxZoom: 13.5,
  // maxBounds: [
  //   [-123.29430051866589, 49.15593259948497],
  //   [-122.89152688587282, 49.34756088632997],
  // ],
}

export const initialPopup = {
  closeButton: false,
  closeOnClick: false,
}

export const configSearch = {
  country: 'ca',
  placeholder: 'Search address, street, neighborhood or city',
}


export const typeFormLink = 'https://uptownapp.typeform.com/to/Mx3yJU'

export const sources = [
  {
    id: 'census-tracts',
    url: 'tmirmota.3u8wgv7d',
    type: 'vector'
  },
  {
    id: 'properties',
    url: 'tmirmota.69r2qz2u',
    type: 'vector'
  },
  {
    id: 'zoning',
    url: 'tmirmota.5h7gkfwq',
    type: 'vector'
  },
  {
    id: 'schools',
    url: 'tmirmota.7qw6uywz',
    type: 'vector'
  },
  {
    id: 'fire-hydrants',
    url: 'tmirmota.1vk80tum',
    type: 'vector'
  },
  {
    id: 'transit-lines',
    url: 'tmirmota.26nf1ybn',
    type: 'vector'
  },
  {
    id: 'transit-stations',
    url: 'tmirmota.09jmh0eh',
    type: 'vector'
  },
]

export const additionalBaseLayers = [
  {
    source: 'properties',
    sourceLayer: 'property_parcel_polygonsgeojson',
    minzoom: 14,
    maxzoom: 22,
    filter: 'Name'
  }
]

export const additionalBaseStyles = [
  {
    id: '-fill',
    type: 'fill',
    paint: {
      'fill-opacity': 0.1,
      'fill-color': '#651fff'
    },
    hasFilter: false
  },
  {
    id: '-fill-hover',
    type: 'fill',
    paint: {
      'fill-opacity': 0.5,
      'fill-color': '#64ffda'
    },
    hasFilter: true
  },
  {
    id: '-line',
    type: 'line',
    paint: {
      'line-color': '#651fff',
      'line-opacity': 0.1,
      'line-width': 2
    }
  },
  {
    id: '-line-hover',
    type: 'line',
    paint: {
      'line-color': '#64ffda',
      'line-opacity': 0.5,
      'line-width': 2
    },
    hasFilter: true
  },
  {
    id: '-fill-click',
    type: 'fill',
    paint: {
      'fill-color': '#f50057'
    },
    hasFilter: true
  }
]

export const zoneFill = {
  id: 'zoning-fill',
  source: 'zoning',
  'source-layer': 'zoning_districtsgeojson',
  minzoom: 11,
  maxzoom: 22,
  type: 'fill',
  paint: {
    'fill-opacity': 0.0,
    'fill-color': '#FFFFFF'
  }
}
