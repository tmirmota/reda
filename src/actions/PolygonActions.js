import * as types from '../constants/ActionTypes'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

export const displayPopup = (location, rent) => (dispatch, getState) => {
  const { property, mapFeatures } = getState()
  const { map, popup, bedrooms } = mapFeatures
  const { average_price, number_of_rentals } = rent
  const {num} = bedrooms.find(bdr => bdr.value)

  if (average_price > 0) {
    map.getCanvas().style.cursor = 'pointer'

    const popupText = `
      <div class="width-150">
        <h6 class="lead">${toCAD(average_price)} / ${num} bdr</h6>
        ${
          property.neighborhood
            ? `<div>In ${property.neighborhood}</div>`
            : ''
        }
        <div class="text-muted">based on ${number_of_rentals} rentals</div>
      </div>`
    popup
      .setLngLat(location.lngLat)
      .setHTML(popupText)
      .addTo(map)
  }
}

export const hoverPolygon = e => (dispatch, getState) => {
  const { mapFeatures, rents } = getState()
  const { map, popup, bedrooms } = mapFeatures

  const ctuid = e.features[0].properties['CTUID']

  popup.remove()
  map.getCanvas().style.cursor = ''
  const filterName = e.features[0].properties['CTUID']
  map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', filterName])

  const rent = rents.find(rent => rent.ctuid === ctuid)

  if (rent) {
    dispatch(displayPopup(e, rent))
    dispatch(queryNeighborhood(e))
    dispatch({ type: types.UPDATE_RENT, rent })
  } else {
    dispatch({ type: types.RESET_RENT })
  }
}
