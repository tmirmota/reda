const neighborhoodRef = document.getElementById('neighborhood')
const rentRef = document.getElementById('rent')

const mapboxKey =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

const myMap = L.map('mapid').setView(
  [49.257482642589025, -123.16407742426055],
  12
)

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw',
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:
      'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'
  }
).addTo(myMap)

const dmLayer = L.geoJSON(geoJSONFeature).addTo(myMap)

mouseOver = async e => {
  const { layer, latlng } = e
  const { id } = layer.feature.properties
  const dm = data.find(({ GeoUID }) => GeoUID === Number(id))

  const { json, error } = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng.lng}%2C${latlng.lat}.json?access_token=${mapboxKey}`
  )
    .then(res => res.json())
    .then(json => ({ json }))
    .catch(error => ({ error }))

  let neighborhood

  if (json) {
    const neighborhoodObj = json.features.find(
      ({ place_type }) => place_type[0] === 'neighborhood'
    )
    if (neighborhoodObj) {
      neighborhood = neighborhoodObj.text
    } else {
      const placeObj = json.features.find(
        ({ place_type }) => place_type[0] === 'place'
      )
      neighborhood = placeObj.text
    }
  }

  const rent = dm[
    'v_CA16_4901: Average monthly shelter costs for rented dwellings ($)'
  ]
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  neighborhoodRef.innerHTML = neighborhood
  rentRef.innerHTML = `Single Dwelling Rent: $${rent} / month`
}

mouseOut = e => {
  rentRef.innerHTML = ''
  neighborhoodRef.innerHTML = ''
}

dmLayer.on('mouseover', mouseOver)
dmLayer.on('mouseout', mouseOut)

// function initMap() {
//   const geocoder = new google.maps.Geocoder()
// const map = new google.maps.Map(document.getElementById('map'), {
//   center: { lat: 49.257482642589025, lng: -123.16407742426055 },
//   zoom: 12
// })
//   map.data.loadGeoJson('https://reda-map-yapcgbvtzw.now.sh/dm-van.geojson')
//   map.data.addListener('mousein', mouseInToRegion)
//   map.data.addListener('mouseout', mouseInToRegion)
//   function mouseInToRegion(e) {
//     geocoder.geocode({ location: e.latLng }, async (results, status) => {
//       if (status === 'OK') {
//         if (results[0]) {
//           const neighborhoodObj = results.find(
//             ({ types }) =>
//               types.filter(type => type === 'neighborhood').length > 0
//           )
//
//           let neighborhood
//           if (neighborhoodObj) {
//             neighborhood = neighborhoodObj.address_components[0].long_name
//           } else {
//             neighborhood = results[1].address_components[0].long_name
//           }
//
//           document.getElementById('name').innerHTML = neighborhood
//         }
//       }
//     })
//
//     const id = e.feature.getProperty('id')
//     const dm = data.find(({ GeoUID }) => GeoUID === Number(id))
//
//     const population = dm['Population']
//     const dwellings = dm['Dwellings']
//     const rent =
//       dm['v_CA16_4901: Average monthly shelter costs for rented dwellings ($)']
//
//     const area = document.getElementById('area')
//     area.innerHTML = `
//       <div>
//         <div>Population: ${population}</div>
//         <div>Houses: ${dwellings}</div>
//         <div>Rent: ${rent}</div>
//       </div>
//     `
//   }
//   function mouseOutOfRegion(e) {
//     document.getElementById('name').innerHTML = ' '
//     const area = document.getElementById('area')
//     area.innerHTML = `
//       <div>
//         <div>Population: n/a</div>
//         <div>Houses: n/a</div>
//         <div>Rent: n/a</div>
//       </div>
//     `
//   }
// }
