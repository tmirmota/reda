import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'
import { CTS_URL } from '../constants/ApiConstants'

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
      storeMapnPopup,
      fetchRents,
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

    const popup = new mapboxgl.Popup({
      ...initialPopup,
    })

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: MAPBOX_ACCESS_TOKEN,
    //     ...configSearch,
    //   }),
    //   'top-right',
    // )

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      storeMapnPopup(map, popup)
      // addSources(map)
      // addLayers(map)
      fetchRents()

      map.on('mousemove', 'census-tracts-2016geojson', e => {
        hoverPolygon(e)
      })
      map.on('mouseleave', 'census-tracts-2016geojson', () => {
        map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', ''])
        clearState()
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
