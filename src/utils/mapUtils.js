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
          return map.addLayer({
            id: `${source}${id}`,
            'source-layer': sourceLayer,
            source,
            minzoom,
            maxzoom,
            type,
            paint,
            filter: ['==', filter, ''],
          })
        } else {
          return map.addLayer({
            id: `${source}${id}`,
            'source-layer': sourceLayer,
            source,
            minzoom,
            maxzoom,
            type,
            paint,
          })
        }
      })
    },
  )
}
