import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { MAPBOX_ACCESS_TOKEN } from '../constants/ApiConstants'

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
      mapFeatures,
      storeMapnPopup,
      updateCoordinates,
      hoverProperty,
      hoverPolygon,
      fetchDataLayers,
      clearState,
    } = this.props

    const { lng, lat, zoom, style, maxBounds } = mapFeatures

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://${style}`,
      center: [lng, lat],
      zoom,
      maxBounds,
    })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })

    map.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        country: 'ca',
        placeholder: 'Search address, street, neighborhood or city',
      }),
      'top-left',
    )

    map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    map.on('load', () => {
      storeMapnPopup(map, popup)
      addSources(map)
      addLayers(map)
      fetchDataLayers()

      map.setLayerZoomRange('road-label-large', 13.5, 22)
      map.setLayerZoomRange('road-label-medium', 15, 22)

      map.on('mousemove', 'census-tracts-fill', e => {
        const filterName = e.features[0].properties['CTUID']
        map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', filterName])
        hoverPolygon(e)
      })
      map.on('mouseleave', 'census-tracts-fill', () => {
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
        updateCoordinates(map)
      })
    })
  }
}

export default Map
