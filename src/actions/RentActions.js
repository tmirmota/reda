import * as types from '../constants/ActionTypes'
import { CTS_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { addHeatMapLayer } from './MapActions'

export const fetchRents = () => async (dispatch, getState) => {
  const { map, bedrooms } = getState().mapFeatures
  let beds = bedrooms.find(({ value }) => value).num

  if (beds === 3) {
    beds = [3,4,5,6,7,8]
  }

  const bounds = map.getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const url = `${CTS_URL}?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${
    ne.lng
  }&nelat=${ne.lat}&bedrooms=${beds}`

  const { json } = await apiFetch(url)
  if (json) {
    dispatch({
      type: types.FETCH_RENTS,
      rents: json,
    })
    dispatch(addHeatMapLayer(json))
  }
}
