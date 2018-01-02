import {
  sources,
  additionalBaseLayers,
  additionalBaseStyles,
  zoneFill
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
  additionalBaseLayers.map(
    ({ source, sourceLayer, minzoom, maxzoom, filter }) => {
      additionalBaseStyles.map(({ id, type, paint, hasFilter }) => {
        map.addLayer({
          id: `${source}${id}`,
          source,
          'source-layer': sourceLayer,
          type,
          paint,
          filter: hasFilter ? ['==', filter, ''] : '',
        })
      })
    },
  )
}

export const listenMouseMove = map => {
  map.addLayer(zoneFill)

  map.on('click', `properties-fill`, e => {
    const feature = e.features[0]

    const { Name, Description } = feature.properties
    const layer = `properties-fill-click`

    const indexPcoord = Description.indexOf('PCOORD:')
    const indexSiteId = Description.indexOf('SITE_ID:')
    const newPcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)

    const { selectedProperty } = this.state
    const pcoord = selectedProperty ? selectedProperty.pcoord : null
    if (pcoord === newPcoord) {
      map.setFilter(layer, ['==', 'Name', ''])
      this.setState({ selectedProperty: null })
    } else if (Name) {
      map.setFilter(layer, ['==', 'Name', Name])
      this.setState({ selectedProperty: this.state.property })
    }
  })
  additionalBaseLayers.map(({ source, filter }) => {
    map.on('mousemove', `${source}-fill`, e => {
      const feature = e.features[0]

      const { source } = feature.layer

      if (source === 'properties') {
        const { Description } = feature.properties
        const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
        const indexStdStreet = Description.indexOf('STD_STREET:')
        const indexPcoord = Description.indexOf('PCOORD:')
        const indexSiteId = Description.indexOf('SITE_ID:')
        const pcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)

        const number = Description.substring(
          indexCivicNum + 13,
          indexStdStreet - 1,
        )
        const street = Description.substring(
          indexStdStreet + 11,
          indexPcoord - 1,
        )
        if (this.state.property.pcoord !== pcoord) {
          updateAddress(number, street, pcoord)
          fetchProperty(pcoord)
          fetchPlace(e.lngLat)
        }
      } else if (
        source === 'census-tracts' ||
        source === 'dissemination_area'
      ) {
        const ctuid = feature.properties['CTUID']
        const ctname = feature.properties['CTNAME']

        if (this.state.ct.ctuid !== ctuid) {
          this.requestHouseholdIncome(ctuid)
          this.reverseGeocode(e.lngLat)
        }

        if (this.state.ct.ctname !== ctname) {
          this.requestRent(ctname)
        }

        this.setState(prevState => ({
          ct: {
            ...prevState.ct,
            ctuid,
            ctname,
          },
        }))
      }

      const filterName = feature.properties[filter]
      map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
      map.setFilter(`${source}-line-hover`, ['==', filter, filterName])
    })
    map.on('mouseleave', `${source}-fill`, () => {
      map.setFilter(`${source}-fill-hover`, ['==', filter, ''])
      map.setFilter(`${source}-line-hover`, ['==', filter, ''])
    })
  })
}
