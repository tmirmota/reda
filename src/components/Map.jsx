import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { MAPBOX_ACCESS_TOKEN } from '../constants/ApiConstants'
import {
  configSearch,
  initialPopup,
  initialMap,
} from '../constants/MapConstants'

class Map extends Component {
  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="absolute top right left bottom"
      />
    )
  }
  componentDidMount() {
    const {
      initMap,
      hoverProperty,
      hoverPolygon,
      showRedoSearch,
      clearState,
    } = this.props

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      ...initialMap,
    })

    const desktop = window.innerWidth >= 768

    if (desktop) {
          // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: MAPBOX_ACCESS_TOKEN,
    //     ...configSearch,
    //   }),
    //   'top-right',
    // )

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    }

    const popup = new mapboxgl.Popup({
      ...initialPopup,
    })  

    map.on('load', () => {
      initMap(map, popup)
      addSources(map)
      addLayers(map)

      map.addLayer(
        {
          id: 'census-tracts-fill-hover',
          source: 'census-tracts',
          'source-layer': 'census_tracts_2016geojson',
          minzoom: 9,
          maxzoom: 14,
          type: 'line',
          paint: {
            'line-color': '#4fc3f7',
            'line-width': 3
          },
          filter: ['==', 'CTUID', '']
        },
        'water'
      )

      map.on('mousemove', 'census-tracts-2016geojson', e => {
        hoverPolygon(e)
      })

      map.on('mouseleave', 'census-tracts-2016geojson', () => {
        map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', ''])
        clearState()
        popup.remove()
      })

      map.on('mousemove', 'properties-fill', e => {
        const filterName = e.features[0].properties['Name']
        map.setFilter('properties-fill-hover', ['==', 'Name', filterName])
        hoverProperty(e)
      })

      map.on('mouseleave', 'properties-fill', () => {
        map.setFilter('properties-fill-hover', ['==', 'Name', ''])
        clearState()
      })

      map.on('move', () => {
        showRedoSearch()
      })
    })
  }
}

export default Map
