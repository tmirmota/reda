export const sources = [
  {
    id: 'census-tracts',
    url: 'tmirmota.3u8wgv7d',
    type: 'vector',
  },
  {
    id: 'dissemination-area',
    url: 'tmirmota.22vjwdw2',
    type: 'vector',
  },
  {
    id: 'properties',
    url: 'tmirmota.69r2qz2u',
    type: 'vector',
  },
  {
    id: 'zoning',
    url: 'tmirmota.5h7gkfwq',
    type: 'vector',
  },
  {
    id: 'schools',
    url: 'tmirmota.7qw6uywz',
    type: 'vector',
  },
  {
    id: 'fire-hydrants',
    url: 'tmirmota.1vk80tum',
    type: 'vector',
  },
  {
    id: 'transit-lines',
    url: 'tmirmota.26nf1ybn',
    type: 'vector',
  },
  {
    id: 'transit-stations',
    url: 'tmirmota.09jmh0eh',
    type: 'vector',
  },
]

export const additionalBaseLayers = [
  {
    source: 'census-tracts',
    sourceLayer: 'census_tracts_2016geojson',
    minzoom: 9,
    maxzoom: 14,
    filter: 'CTUID',
  },
  // {
  //   source: 'dissemination-area',
  //   sourceLayer: 'dissemination_areageojson',
  //   minzoom: 11,
  //   maxzoom: 14,
  //   filter: 'DAUID',
  // },
  // {
  //   source: 'properties',
  //   sourceLayer: 'property_parcel_polygonsgeojson',
  //   minzoom: 14,
  //   maxzoom: 22,
  //   filter: 'Name',
  // },
]

export const additionalBaseStyles = [
  {
    id: '-fill',
    type: 'fill',
    paint: {
      'fill-opacity': 0.1,
      'fill-color': '#651fff',
    },
    hasFilter: false,
  },
  {
    id: '-fill-hover',
    type: 'fill',
    paint: {
      'fill-opacity': 0.5,
      'fill-color': '#64ffda',
    },
    hasFilter: true,
  },
  {
    id: '-line',
    type: 'line',
    paint: {
      'line-color': '#651fff',
      'line-opacity': 0.1,
      'line-width': 2,
    },
  },
  {
    id: '-line-hover',
    type: 'line',
    paint: {
      'line-color': '#64ffda',
      'line-opacity': 0.5,
      'line-width': 2,
    },
    hasFilter: true,
  },
  {
    id: '-fill-click',
    type: 'fill',
    paint: {
      'fill-color': '#f50057',
    },
    hasFilter: true,
  },
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
    'fill-color': '#FFFFFF',
  },
}

export const zoneLine = {
  id: 'zoning-line',
  source: 'zoning',
  'source-layer': 'zoning_districtsgeojson',
  minzoom: 11,
  maxzoom: 22,
  type: 'line',
  paint: {
    'line-color': '#f412da',
  },
}
