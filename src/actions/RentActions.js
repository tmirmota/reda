import * as types from '../constants/ActionTypes'
import { CTS_URL } from '../constants/ApiConstants'
import { apiFetch } from '../utils/apiUtils'
import { addHeatMapLayer } from './MapActions'

export const fetchRents = () => async (dispatch, getState) => {
  const { map, bedrooms } = getState().mapFeatures
  const arrBeds = bedrooms.reduce((arr, bedroom) => {
    const { num, value } = bedroom
    if (value) {
      return arr.push(num)
    } else {
      return arr
    }
  }, [])

  const bounds = map.getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  const url = `${CTS_URL}?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${
    ne.lng
  }&nelat=${ne.lat}&bedrooms=${arrBeds}`

  const { json } = await apiFetch(url)
  if (json) {
    dispatch({
      type: types.FETCH_RENTS,
      rents: json,
    })
    dispatch(addHeatMapLayer(json))
  }
}
