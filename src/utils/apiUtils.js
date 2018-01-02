export const apiFetch = (url, method = 'GET', body) =>
  fetch(url, { method, body })
    .then(res => res.status === 200 ? res.json() : console.log(res))
    .then(json => ({ json }))
    .catch(error => ({ error }))
