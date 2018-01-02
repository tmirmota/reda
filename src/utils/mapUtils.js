import {
  sources,
  additionalBaseLayers,
  additionalBaseStyles,
  zoneFill,
} from '../constants/MapConstants'
import {
  updateAddress,
  fetchPlace,
  fetchProperty,
} from '../actions/PropertyActions'
import { fetchIncome, fetchRent } from '../actions/PolygonActions'

export const addSources = map => {
  sources.map(({ id, url, type }) => {
    map.addSource(id, { type, url: `mapbox://${url}` })
  })
}

export const addLayers = map => {
  map.addLayer(zoneFill)
  additionalBaseLayers.map(
    ({ source, sourceLayer, minzoom, maxzoom, filter }) => {
      additionalBaseStyles.map(({ id, type, paint, hasFilter }) => {
        if (hasFilter) {
          map.addLayer({
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
          map.addLayer({
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

export const getPropertyDescription = Description => {
  const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
  const indexStdStreet = Description.indexOf('STD_STREET:')
  const indexPcoord = Description.indexOf('PCOORD:')
  const indexSiteId = Description.indexOf('SITE_ID:')
  const pcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)
  const number = Description.substring(indexCivicNum + 13, indexStdStreet - 1)
  const street = Description.substring(indexStdStreet + 11, indexPcoord - 1)
  return { pcoord, number, street }
}
