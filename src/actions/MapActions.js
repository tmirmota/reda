import * as types from '../constants/ActionTypes'
import {
  addSources,
  addLayers,
  getPropertyDescription,
} from '../utils/mapUtils'
import { additionalBaseLayers } from '../constants/MapConstants'
import {
  fetchRent,
  fetchIncome,
  updatePolgyonIds,
} from '../actions/PolygonActions'
import {
  fetchProperty,
  fetchPlace,
  updateAddress,
} from '../actions/PropertyActions'
import {
  setSelectedProperty,
  removeSelectedProperty,
} from '../actions/SelectedProperty'

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}

export const onLoadMap = (map, popup) => (dispatch, getState) => {
  const { property, selectedProperty, polygon } = getState()
  addSources(map)
  addLayers(map)

  map.on('click', `properties-fill`, e => {
    const { Name, Description } = e.features[0].properties
    const layer = `properties-fill-click`
    const propDetails = getPropertyDescription(Description)
    const pcoord = selectedProperty ? selectedProperty.pcoord : null
    if (pcoord === propDetails.pcoord) {
      map.setFilter(layer, ['==', 'Name', ''])
      removeSelectedProperty()
    } else if (Name) {
      map.setFilter(layer, ['==', 'Name', Name])
      setSelectedProperty(property)
    }
  })

  additionalBaseLayers.map(({ source, filter }) => {
    map.on('mousemove', `${source}-fill`, e => {
      const feature = e.features[0]
      const { source } = feature.layer

      if (source === 'properties') {
        const { Description } = feature.properties
        const { pcoord, number, street } = getPropertyDescription(Description)

        if (property.pcoord !== pcoord) {
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

        if (polygon.ctuid !== ctuid) {
          fetchIncome(ctuid)
          fetchPlace(e.lngLat)
        }
        if (polygon.ctname !== ctname) return fetchRent(ctname)

        updatePolgyonIds(ctuid, ctname)
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

  dispatch({ type: types.SET_MAP, map, popup })
}
