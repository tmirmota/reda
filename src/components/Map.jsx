import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'
import MapOverlay from '../components/MapOverlay'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { MAPBOX_ACCESS_TOKEN } from '../constants/ApiConstants'
import {
  configSearch,
  initialPopup,
  initialMap,
} from '../constants/MapConstants'

const styles = {
  containerSize: {
    width: '100%',
    height: 'calc(100vh - 64px)'
  }
}

class Map extends Component {
  render() {
    return (
      <div>
        <div
          ref={el => (this.mapContainer = el)}
          style={styles.containerSize}
        />
        {/*<MapOverlay />*/}
      </div>
    )
  }
  componentDidMount() {
    const {
      initMap,
      geoCodeResult,
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

    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      ...configSearch,
    })

    geocoder.on('result', ev => {
      geoCodeResult(ev.result)
    })

    if (desktop) {
      map.addControl(geocoder, 'top-left')
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    }

    const popup = new mapboxgl.Popup({
      ...initialPopup,
    })

    map.on('load', () => {
      initMap(map, popup)

      map.on('mousemove', 'census-tracts-2016geojson', e => {
        // map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', filterName])
        hoverPolygon(e)
      })

      map.on('mouseleave', 'census-tracts-2016geojson', () => {
        // map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', ''])
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

      map.addSource('search-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })

      map.addLayer({
        id: 'point',
        source: 'search-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf',
        },
      })
    })
  }
}

export default Map
