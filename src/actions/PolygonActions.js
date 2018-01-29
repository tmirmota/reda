import * as types from '../constants/ActionTypes'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

export const displayPopup = (location, rent) => (dispatch, getState) => {
  const { property, mapFeatures } = getState()
  const { map, popup, bedrooms } = mapFeatures
  const { price, count } = rent
  const { num } = bedrooms.find(bdr => bdr.value)

  if (price > 0) {
    map.getCanvas().style.cursor = 'pointer'

    const popupText = `
      <div class="width-150">
        <h6 class="lead">${toCAD(price)} / ${num}${
      bedrooms.length === num ? '+' : ''
    } bdr</h6>
        ${property.neighborhood ? `<div>In ${property.neighborhood}</div>` : ''}
        <div class="text-muted">based on ${count} rentals</div>
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

  const polyObj = rents.find(rent => rent.ctuid === ctuid)

  if (polyObj) {
    const {
      average_price,
      median_price,
      number_of_rentals,
      average_sqft,
      min_price,
      max_price
    } = polyObj
    const price = average_price > median_price ? median_price : average_price
    if (number_of_rentals < 5) {
      dispatch({ type: types.RESET_RENT })
      return false
    }
    const rent = {
      price,
      count: number_of_rentals,
      sqft: average_sqft,
      min: min_price,
      max: max_price
    }

    dispatch(displayPopup(e, rent))
    dispatch(queryNeighborhood(e))
    dispatch({ type: types.UPDATE_RENT, rent })
  } else {
    dispatch({ type: types.RESET_RENT })
  }
}
