import * as types from '../constants/ActionTypes'
import { pointOnFeature } from '@turf/turf'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

export const displayPopup = (location, value) => (dispatch, getState) => {
  const { property, mapFeatures } = getState()
  const { map, popup, bedrooms } = mapFeatures

  if (value > 0) {
    map.getCanvas().style.cursor = 'pointer'

    // const pointOnPolygon = pointOnFeature(location.features[0])

    const popupText = `
      <div class="width-150">
        <h5>${toCAD(value)}<span> / ${bedrooms}  bdr</span></h5>
        <div>AVERAGE RENT</div>
        ${property.neighborhood ? `<div class="text-muted">In ${property.neighborhood}</div>` : ''}
      </div>`
    popup
      .setLngLat(location.lngLat)
      .setHTML(popupText)
      .addTo(map)
  }
}

export const hoverPolygon = e => (dispatch, getState) => {
  const { map, popup, bedrooms } = getState().mapFeatures

  const rent = {
    price: e.features[0].properties[`bedroom_${bedrooms}_average_price`],
    count: e.features[0].properties[`bedroom_${bedrooms}_count`],
    sqft: e.features[0].properties[`bedroom_${bedrooms}_average_sqft`]
  }

  popup.remove()
  map.getCanvas().style.cursor = ''

  if (rent.price > 0) {
    dispatch(displayPopup(e, rent.price))
    dispatch(queryNeighborhood(e))
    dispatch({ type: types.UPDATE_RENT, rent })
  } else {
    dispatch({ type: types.RESET_RENT })
  }
}
