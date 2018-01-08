import * as types from '../constants/ActionTypes'
import { INCOME_URL, RENT_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { getRents } from '../utils/placeUtils'
import { toCAD } from '../utils/formatUtils'
import { queryNeighborhood } from '../actions/PropertyActions'

export const displayPopup = (location, value) => (dispatch, getState) => {
  const { property, mapFeatures, rent } = getState()
  const { map, popup, metricName, metricType } = mapFeatures

  const features = map.queryRenderedFeatures(location.point, {
    layers: ['census-tracts-2016geojson'],
  })

  if (features.length > 0 && value > 0) {
    map.getCanvas().style.cursor = 'pointer'

    const popupText = `
      <div class="width-150">
        <h5>${toCAD(value)}<span> / ${metricType
      .replace('_', ' ')
      .substring(8, 9)} bdr</span></h5>
        <div>${metricName.replace('_', ' ')}</div>
        <div class="text-muted">In ${property.neighborhood}</div>
      </div>`
    popup
      .setLngLat(location.lngLat)
      .setHTML(popupText)
      .addTo(map)
  }
}

export const hoverPolygon = e => (dispatch, getState) => {
  const {
    map,
    popup,
    rents,
    metricName,
    metricType,
    identifier,
  } = getState().mapFeatures
  const id = e.features[0].properties[identifier]

  popup.remove()
  map.getCanvas().style.cursor = ''

  const priceMetric = `${metricName}_${metricType}`
  const countMetric = `${metricName}_${metricType}_COUNT`

  const rentRef = rents.find(row => row[identifier] === id)

  const rent = {
    price: rentRef[priceMetric].toFixed(),
    count: rentRef[countMetric],
  }

  if (rent.price > 0) {
    dispatch(displayPopup(e, rent.price))
    dispatch(queryNeighborhood(e))
    dispatch({ type: types.UPDATE_RENT, rent })
  } else {
    dispatch({ type: types.RESET_RENT })
  }
}
