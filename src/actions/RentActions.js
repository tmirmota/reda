import * as types from '../constants/ActionTypes'
import { CTS_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'

export const fetchRents = () => async (dispatch, getState) => {
  const { map, bedrooms } = getState().mapFeatures

  const bounds = map.getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const url = `${CTS_URL}?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${
    ne.lng
  }&nelat=${ne.lat}&bedrooms=${bedrooms}`

  const { json } = await apiFetch(url)
  if (json) {
    dispatch({
      type: types.FETCH_RENTS,
      rents: json
    })
  }
}
