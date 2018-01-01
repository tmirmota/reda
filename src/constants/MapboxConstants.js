export const mapboxAccessToken =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

export const sources = [
  {
    source: 'census-tracts',
    sourceLayer: 'census_tracts_2016geojson',
    minzoom: 9,
    maxzoom: 13,
    type: 'vector',
    url: 'tmirmota.3u8wgv7d',
    filter: 'CTUID'
  },
  {
    source: 'dissemination_area',
    sourceLayer: 'dissemination_areageojson',
    minzoom: 13,
    maxzoom: 15,
    type: 'vector',
    url: 'tmirmota.22vjwdw2',
    filter: 'DAUID'
  },
  {
    source: 'properties',
    sourceLayer: 'property_parcel_polygonsgeojson',
    minzoom: 15,
    maxzoom: 22,
    type: 'vector',
    url: 'tmirmota.69r2qz2u',
    filter: 'Name'
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

export const zoneLine = {
  id: 'zoning-line',
  source: 'zoning',
  'source-layer': 'zoning_districtsgeojson',
  minzoom: 11,
  maxzoom: 22,
  type: 'line',
  paint: {
    'line-color': '#f412da'
  }
}
