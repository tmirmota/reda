import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

const initialState = {
  lat: 49.25703449385483,
  lng: -123.13180508539645,
  zoom: 11,
  name: '',
  description: '',
  lngLat: null
}

class App extends Component {
  state = initialState
  render() {
    const { name, description, lngLat } = this.state

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <div className="col pt-4 sidebar">
            {lngLat && (
              <div>
                <div>
                  <strong>Name: {name}</strong>
                </div>
                <hr />
                <div>
                  <p>{description}</p>
                  <p>
                    Lat: {lngLat.lat}
                    <br />Lng: {lngLat.lng}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col col-10">
            <div
              ref={el => (this.mapContainer = el)}
              className="absolute top right left bottom"
            />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const sources = [
      {
        source: 'properties',
        sourceLayer: 'property_parcel_polygonsgeojson',
        minzoom: 14,
        maxzoom: 19,
        type: 'vector',
        url: 'tmirmota.69r2qz2u'
      },
      {
        source: 'census-tracts',
        sourceLayer: 'census_tracts_2016geojson',
        minzoom: 9,
        maxzoom: 14,
        type: 'vector',
        url: 'tmirmota.4abgvo5b'
      }
    ]

    const { lng, lat, zoom } = this.state

    const fillColor = '#3f51b5'

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/tmirmota/cjb1fqagmg2r82srs6d5s9sew',
      center: [lng, lat],
      zoom
    })

    map.on('load', () => {
      map
        .addSource('census-tracts', {
          type: 'vector',
          url: 'mapbox://tmirmota.4abgvo5b'
        })
        .addSource('properties', {
          type: 'vector',
          url: 'mapbox://tmirmota.69r2qz2u'
        })

      sources.map(({ source, sourceLayer, maxzoom, minzoom }) => {
        map.addLayer({
          id: `${source}-fill`,
          source,
          'source-layer': sourceLayer,
          minzoom,
          maxzoom,
          type: 'fill',
          paint: {
            'fill-opacity': 0.2,
            'fill-color': fillColor
          }
        })

        map.addLayer({
          id: `${source}-line`,
          source,
          'source-layer': sourceLayer,
          minzoom,
          maxzoom,
          type: 'line',
          paint: {
            'line-color': '#7986cb'
          }
        })

        map.addLayer({
          id: `${source}-fill-hover`,
          source,
          'source-layer': sourceLayer,
          type: 'fill',
          paint: {
            'fill-opacity': 0.5,
            'fill-color': '#1de9b6'
          },
          filter: ['==', 'Name', '']
        })

        map.addLayer({
          id: `${source}-line-hover`,
          source,
          'source-layer': sourceLayer,
          type: 'line',
          paint: {
            'line-color': '#1de9b6'
          },
          filter: ['==', 'Name', '']
        })

        map.on('mousemove', `${source}-fill`, e => {
          console.log(e)

          const { features, lngLat } = e
          const { Name, Description } = features[0].properties

          this.setState({ name: Name, description: Description, lngLat })
          map.setFilter(`${source}-fill-hover`, ['==', 'Name', Name])
          map.setFilter(`${source}-line-hover`, ['==', 'Name', Name])
        })

        map.on('mouseleave', `${source}-fill`, () => {
          map.setFilter(`${source}-fill-hover`, ['==', 'Name', ''])
          map.setFilter(`${source}-line-hover`, ['==', 'Name', ''])
        })
        return true
      })
    })

    map.on('move', () => {
      const { lng, lat } = map.getCenter()
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })
  }
}

export default App
