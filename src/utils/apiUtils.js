export const hostReda = 'https://reda-188106.appspot.com'
export const hostMapbox = 'https://api.mapbox.com'

export const apiFetch = (url, method = 'GET', body) =>
  fetch(url, { method, body })
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))
