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
  //   source: 'dissemination_area',
  //   sourceLayer: 'dissemination_areageojson',
  //   minzoom: 13,
  //   maxzoom: 15,
  //   filter: 'DAUID'
  // },
  {
    source: 'properties',
    sourceLayer: 'property_parcel_polygonsgeojson',
    minzoom: 14,
    maxzoom: 22,
    filter: 'Name',
  },
]

export const additionalBaseStyles = [
  {
    id: '-fill',
    type: 'fill',
    paint: {
      'fill-opacity': 0.2,
      'fill-color': '#3f51b5',
    },
  },
  {
    id: '-line',
    type: 'line',
    paint: {
      'line-color': '#7986cb',
    },
  },
  {
    id: '-fill-hover',
    type: 'fill',
    paint: {
      'fill-opacity': 0.5,
      'fill-color': '#1de9b6',
    },
    hasFilter: true,
  },
  {
    id: '-line-hover',
    type: 'line',
    paint: {
      'line-color': '#1de9b6',
    },
    hasFilter: true,
  },
  {
    id: '-fill-click',
    type: 'fill',
    paint: {
      'fill-color': '#e9291d',
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
