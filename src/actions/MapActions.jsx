import * as types from '../constants/ActionTypes'
import { addSources, addLayers, listenMouseMove } from '../utils/mapUtils'

export const onLoadMap = (map, popup) => dispatch => {
  addSources(map)
  addLayers(map)
  listenMouseMove(map)

  dispatch({ type: types.SET_MAP, map, popup })
}

export const updateCoordinates = map => dispatch => {
  const { lng, lat } = map.getCenter()
  dispatch({ type: types.UPDATE_COORDINATES, lng, lat, zoom: map.getZoom() })
}
