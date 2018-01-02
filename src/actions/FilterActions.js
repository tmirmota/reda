import * as types from '../constants/ActionTypes'

// toggleZoning = (event, checked) => {
//   const { map, filters } = this.state
//   if (checked) {
//     map.addLayer(zoneLine)
//   } else {
//     map.removeLayer('zoning-line')
//   }
//   filters['zoning'] = checked
//   this.setState({ filters })
// }
// toggleTransit = (event, checked) => {
//   const { map, popup, filters } = this.state
//   if (checked) {
//     map.addLayer({
//       id: 'transit-lines',
//       source: 'transit-lines',
//       'source-layer': 'rapid_transit_linegeojson',
//       minzoom: 11,
//       maxzoom: 22,
//       type: 'line',
//       paint: {
//         'line-color': '#128ef4',
//         'line-width': 2
//       }
//     })
//     map.addLayer({
//       id: 'transit-stations',
//       source: 'transit-stations',
//       'source-layer': 'rapid_transit_stationsgeojson',
//       minzoom: 11,
//       maxzoom: 22,
//       type: 'circle',
//       paint: {
//         'circle-radius': {
//           base: 1.4,
//           stops: [[12, 2], [22, 180]]
//         },
//         'circle-color': 'rgb(214, 21, 21)'
//       }
//     })
//     map.on('mousemove', 'transit-stations', e => {
//       map.getCanvas().style.cursor = 'pointer'
//
//       const feature = e.features[0]
//       const { Name } = feature.properties
//
//       popup
//         .setLngLat(feature.geometry.coordinates)
//         .setHTML(Name)
//         .addTo(map)
//     })
//     map.on('mouseleave', 'transit-stations', () => {
//       map.getCanvas().style.cursor = ''
//       popup.remove()
//     })
//   } else {
//     map.removeLayer('transit-lines')
//     map.removeLayer('transit-stations')
//   }
//   filters['transit'] = checked
//   this.setState({ filters })
// }
// toggleFire = (event, checked) => {
//   const { map, filters } = this.state
//   if (checked) {
//     map.addLayer({
//       id: 'fire-hydrants',
//       source: 'fire-hydrants',
//       'source-layer': 'water_hydrantsgeojson',
//       minzoom: 11,
//       maxzoom: 22,
//       type: 'circle',
//       paint: {
//         'circle-radius': {
//           base: 2,
//           stops: [[12, 2], [22, 180]]
//         },
//         'circle-color': 'rgb(214, 21, 21)'
//       }
//     })
//   } else {
//     map.removeLayer('fire-hydrants')
//   }
//   filters['fireHydrants'] = checked
//   this.setState({ filters })
// }
// toggleSchools = (event, checked) => {
//   const { map, popup, filters } = this.state
//   if (checked) {
//     map.addLayer({
//       id: 'school-points',
//       source: 'schools',
//       'source-layer': 'schoolsgeojson',
//       minzoom: 11,
//       maxzoom: 22,
//       type: 'circle',
//       paint: {
//         'circle-radius': {
//           base: 1.5,
//           stops: [[12, 2], [22, 180]]
//         },
//         'circle-color': '#f412da'
//       }
//     })
//
//     map.on('mousemove', 'school-points', e => {
//       map.getCanvas().style.cursor = 'pointer'
//
//       const feature = e.features[0]
//       const { Description } = feature.properties
//
//       const indexName = Description.indexOf('NAME:')
//       const indexAddress = Description.indexOf('ADDRESS:')
//       const indexCategory = Description.indexOf('SCHOOL_CATEGORY:')
//
//       const name = Description.substring(indexName + 5, indexAddress)
//       const category = Description.substring(indexCategory + 16)
//
//       popup
//         .setLngLat(feature.geometry.coordinates)
//         .setHTML(`<div>${name}<br/>${category}</div>`)
//         .addTo(map)
//     })
//     map.on('mouseleave', 'school-points', () => {
//       map.getCanvas().style.cursor = ''
//       popup.remove()
//     })
//   } else {
//     map.removeLayer('school-points')
//   }
//   filters['schools'] = checked
//   this.setState({ filters })
// }
// toggleSatellite = (event, checked) => {
//   const { map, filters } = this.state
//
//   const layers = map.getStyle().layers
//
//   const sourceIds = [
//     'census-tracts',
//     'dissemination_area',
//     'schools',
//     'fire-hydrants',
//     'transit-lines',
//     'transit-stations',
//     'properties',
//     'zoning'
//   ]
//
//   const style = `mapbox://styles/mapbox/${checked ? 'satellite' : 'basic'}-v9`
//   map.setStyle(style)
//   map.on('style.load', () => {
//     const noSources = !map.getSource('census-tracts')
//     if (noSources) {
//       addSources(map)
//       layers.map(layer => {
//         if (sourceIds.includes(layer.source)) {
//           map.addLayer(layer)
//         }
//         return true
//       })
//     }
//   })
//   filters['satellite'] = checked
//   this.setState({ filters })
// }
