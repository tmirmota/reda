import React, { Component } from 'react'
import { addSources, addLayers } from '../utils/mapUtils'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { MAPBOX_ACCESS_TOKEN } from '../constants/ApiConstants'
import { rentLayerID } from '../constants/MapConstants'

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
      addHeatMapLayer,
      clearState
    } = this.props

    const { lng, lat, zoom, style, maxBounds, bedrooms } = mapFeatures

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://${style}`,
      center: [lng, lat],
      zoom
      // maxBounds,
    })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

    map.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        country: 'ca',
        placeholder: 'Search address, street, neighborhood or city'
      }),
      'top-right'
    )

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      storeMapnPopup(map, popup)
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

      // map.addLayer({
      //   id: 'rentals',
      //   source: 'master',
      //   'source-layer': 'MASTER_Rentals_-_Sheet1_1-2q0rmg',
      //   minzoom: 9,
      //   maxzoom: 18,
      //   type: 'circle',
      //   paint: {
      //     'circle-color': '#000000',
      //     'circle-radius': 3
      //   }
      // })

      addHeatMapLayer(`bedroom_${bedrooms}_average_price`)
      // fetchDataLayers(map)

      map.on('mousemove', rentLayerID, e => {
        const filterName = e.features[0].properties['CTUID']
        map.setFilter('census-tracts-fill-hover', ['==', 'CTUID', filterName])
        hoverPolygon(e)
      })
      map.on('mouseleave', rentLayerID, () => {
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
