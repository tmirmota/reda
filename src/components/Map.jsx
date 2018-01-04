import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { MAPBOX_ACCESS_TOKEN } from '../constants/ApiConstants'
import { additionalBaseLayers } from '../constants/MapConstants'

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
    } = this.props

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

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    map.on('load', () => {
      storeMapnPopup(map, popup)
      addSources(map)
      addLayers(map)

      additionalBaseLayers.map(({ source, filter }) => {
        map.on('mousemove', `${source}-fill`, e => {
          const feature = e.features[0]
          const src = feature.layer.source

          if (src === 'properties') {
            hoverProperty(e)
          } else if (src === 'census-tracts' || src === 'dissemination_area') {
            // hoverPolygon(e)
          }

          const filterName = feature.properties[filter]
          map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
          map.setFilter(`${source}-line-hover`, ['==', filter, filterName])
        })
        map.on('mouseleave', `${source}-fill`, () => {
          map.setFilter(`${source}-fill-hover`, ['==', filter, ''])
          map.setFilter(`${source}-line-hover`, ['==', filter, ''])
        })
        return true
      })
    })

    map.on('move', () => {
      updateCoordinates(map)
    })
  }
}

export default Map
