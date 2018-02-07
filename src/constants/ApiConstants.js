const HOST_UPTOWN = 'https://reda-188106.appspot.com'
const HOST_MAPBOX = 'https://api.mapbox.com'

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

export const REVERSE_GEOCODE_URL = `${HOST_MAPBOX}/geocoding/v5/mapbox.places/:query.json?access_token=${MAPBOX_ACCESS_TOKEN}`
export const PROPERTY_TAX_URL = `${HOST_UPTOWN}/property-tax?pcoord=:pcoord`
export const CTS_URL = `${HOST_UPTOWN}/census-tract`
export const ADDRESS_SEARCH_URL = `${HOST_UPTOWN}/address-search`
