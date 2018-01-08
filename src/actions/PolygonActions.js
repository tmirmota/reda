import * as types from '../constants/ActionTypes'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

export const displayPopup = (location, value) => (dispatch, getState) => {
  const { property, mapFeatures } = getState()
  const { map, popup, bedrooms } = mapFeatures

  const features = map.queryRenderedFeatures(location.point, {
    layers: ['census-tracts-2016geojson']
  })

  if (features.length > 0 && value > 0) {
    map.getCanvas().style.cursor = 'pointer'

    const popupText = `
      <div class="width-150">
        <h5>${toCAD(value)}<span> / ${bedrooms}  bdr</span></h5>
        <div>AVERAGE RENT</div>
        <div class="text-muted">In ${property.neighborhood}</div>
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
