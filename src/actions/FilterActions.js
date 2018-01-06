import * as types from '../constants/ActionTypes'
import { zoneLine } from '../constants/MapConstants'

export const toggleZoning = (event, checked) => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map } = mapFeatures
  const features = map.querySourceFeatures('zoning', {
    sourceLayer: ['zoning_districtsgeojson'],
  })
  let arrNames = []
  features.map(({ properties }) => {
    const { Name } = properties
    if (arrNames.indexOf(Name) === -1) {
      arrNames.push(Name)
    }
  })
  console.log(arrNames.sort())
  let stops = []
  arrNames.map((name, index) => {
    const percent = index / arrNames.length
    const r = (percent * 255).toFixed()
    const color = `rgba(${r},0,255,1)`
    stops.push([name, color])
  })
  console.log(stops)
  if (checked) {
    map.addLayer(
      {
        id: 'zoning-line',
        source: 'zoning',
        'source-layer': 'zoning_districtsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'line',
        paint: {
          'line-color': {
            property: 'Name',
            type: 'categorical',
            default: 'transparent',
            stops: stops,
          },
          'line-width': 2,
        },
      },
      'water',
    )
  } else {
    map.removeLayer('zoning-line')
  }
  dispatch({ type: types.TOGGLE_FILTER, name: 'zoning', checked })
}

export const toggleTransit = (event, checked) => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map, popup } = mapFeatures
  if (checked) {
    map.addLayer({
      id: 'transit-lines',
      source: 'transit-lines',
      'source-layer': 'rapid_transit_linegeojson',
      minzoom: 11,
      maxzoom: 22,
      type: 'line',
      paint: {
        'line-color': '#128ef4',
        'line-width': 2,
      },
    })
    map.addLayer({
      id: 'transit-stations',
      source: 'transit-stations',
      'source-layer': 'rapid_transit_stationsgeojson',
      minzoom: 11,
      maxzoom: 22,
      type: 'circle',
      paint: {
        'circle-radius': {
          base: 1.4,
          stops: [[12, 2], [22, 180]],
        },
        'circle-color': 'rgb(214, 21, 21)',
      },
    })
    map.on('mousemove', 'transit-stations', e => {
      map.getCanvas().style.cursor = 'pointer'

      const feature = e.features[0]
      const { Name } = feature.properties

      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(Name)
        .addTo(map)
    })
    map.on('mouseleave', 'transit-stations', () => {
      map.getCanvas().style.cursor = ''
      popup.remove()
    })
  } else {
    map.removeLayer('transit-lines')
    map.removeLayer('transit-stations')
  }
  dispatch({ type: types.TOGGLE_FILTER, name: 'transit', checked })
}

export const toggleFire = (event, checked) => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map } = mapFeatures
  if (checked) {
    map.addLayer({
      id: 'fire-hydrants',
      source: 'fire-hydrants',
      'source-layer': 'water_hydrantsgeojson',
      minzoom: 11,
      maxzoom: 22,
      type: 'circle',
      paint: {
        'circle-radius': {
          base: 2,
          stops: [[12, 2], [22, 180]],
        },
        'circle-color': 'rgb(214, 21, 21)',
      },
    })
  } else {
    map.removeLayer('fire-hydrants')
  }
  dispatch({ type: types.TOGGLE_FILTER, name: 'fireHydrants', checked })
}

export const toggleSchools = (event, checked) => (dispatch, getState) => {
  const { mapFeatures } = getState()
  const { map, popup } = mapFeatures
  if (checked) {
    map.addLayer({
      id: 'school-points',
      source: 'schools',
      'source-layer': 'schoolsgeojson',
      minzoom: 11,
      maxzoom: 22,
      type: 'circle',
      paint: {
        'circle-radius': {
          base: 2,
          stops: [[12, 10], [22, 1.5]],
        },
        'circle-color': '#f412da',
      },
    })

    map.on('mousemove', 'school-points', e => {
      map.getCanvas().style.cursor = 'pointer'

      const feature = e.features[0]
      const { Description } = feature.properties

      const indexName = Description.indexOf('NAME:')
      const indexAddress = Description.indexOf('ADDRESS:')
      const indexCategory = Description.indexOf('SCHOOL_CATEGORY:')

      const name = Description.substring(indexName + 5, indexAddress)
      const category = Description.substring(indexCategory + 16)

      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<div>${name}<br/>${category}</div>`)
        .addTo(map)
    })
    map.on('mouseleave', 'school-points', () => {
      map.getCanvas().style.cursor = ''
      popup.remove()
    })
  } else {
    map.removeLayer('school-points')
  }
  dispatch({ type: types.TOGGLE_FILTER, name: 'schools', checked })
}
