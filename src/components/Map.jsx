import React, { Component } from 'react'

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
    const { mapFeatures, onLoadMap, updateCoordinates } = this.props
    const { lng, lat, zoom, style } = mapFeatures

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://${style}`,
      center: [lng, lat],
      zoom,
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
    )

    map.on('load', () => {
      onLoadMap(map, popup)
    })

    map.on('move', () => {
      updateCoordinates(map)
    })
  }
}

export default Map
