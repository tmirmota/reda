import {
  sources,
  additionalBaseLayers,
  additionalBaseStyles,
  zoneFill,
} from '../constants/MapConstants'

export const addSources = map => {
  sources.map(({ id, url, type }) => {
    return map.addSource(id, { type, url: `mapbox://${url}` })
  })
}

export const addLayers = map => {
  map.addLayer(zoneFill)
  additionalBaseLayers.map(
    ({ source, sourceLayer, minzoom, maxzoom, filter }) => {
      return additionalBaseStyles.map(({ id, type, paint, hasFilter }) => {
        if (hasFilter) {
          return map.addLayer(
            {
              id: `${source}${id}`,
              'source-layer': sourceLayer,
              source,
              minzoom,
              maxzoom,
              type,
              paint,
              filter: ['==', filter, ''],
            },
            'place-neighbourhood',
          )
        } else {
          return map.addLayer(
            {
              id: `${source}${id}`,
              'source-layer': sourceLayer,
              source,
              minzoom,
              maxzoom,
              type,
              paint,
            },
            'place-neighbourhood',
          )
        }
      })
    },
  )
}

export const addHeatMapLayers = (map, fillStops, hoverStops, property) => {
  map.addLayer(
    {
      id: `census-tracts-fill`,
      source: 'census-tracts',
      'source-layer': 'census_tracts_2016geojson',
      minzoom: 9,
      maxzoom: 14,
      type: 'fill',
      paint: {
        'fill-color': {
          property: 'CTNAME',
          type: 'categorical',
          default: 'transparent',
          stops: fillStops,
        },
      },
    },
    'water',
  )
  map.addLayer(
    {
      id: `census-tracts-fill-hover`,
      source: 'census-tracts',
      'source-layer': 'census_tracts_2016geojson',
      minzoom: 9,
      maxzoom: 14,
      type: 'fill',
      paint: {
        'fill-color': {
          property: 'CTNAME',
          type: 'categorical',
          default: 'transparent',
          stops: hoverStops,
        },
      },
      filter: ['==', 'CTUID', ''],
    },
    'water',
  )
}
