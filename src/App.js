import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

const tileProperties = 'tmirmota.69r2qz2u'
const sourceLayer = 'property_parcel_polygonsgeojson'

mapboxgl.accessToken =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

const initialState = {
  lat: 49.257482642589025,
  lng: -123.16407742426055,
  zoom: 18,
  name: '',
  description: '',
  rent: 0
}

class App extends Component {
  state = initialState
  render() {
    const { name, description, rent } = this.state
    const rentTitle = `Single Dwelling Rent: $${rent} / month`

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <div className="col mt-4">
            <h3>Name: {name}</h3>
            <hr />
            <div className="lead">
              <p>{rentTitle}</p>
              <p>{description}</p>
            </div>
          </div>
          <div className="col-9">
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
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/tmirmota/cjb1fqagmg2r82srs6d5s9sew',
      center: [lng, lat],
      zoom
    })

    map.on('load', () => {
      map.addSource('properties', {
        type: 'vector',
        url: `mapbox://${tileProperties}`
      })

      map.addLayer({
        id: 'property-fill',
        source: 'properties',
        'source-layer': sourceLayer,
        type: 'fill',
        paint: {
          'fill-opacity': 0.1,
          'fill-color': '#00ffff',
          'fill-outline-color': '#ffffff'
        }
      })

      map.addLayer({
        id: 'property-fill-hover',
        source: 'properties',
        'source-layer': sourceLayer,
        type: 'fill',
        paint: {
          'fill-opacity': 0.1,
          'fill-color': '#00ffff'
        },
        filter: ['==', 'Name', '']
      })

      map.on('mousemove', 'property-fill', e => {
        console.log(e)
        const { Name, Description } = e.features[0].properties
        this.setState({ name: Name, description: Description })
        map.setFilter('property-fill-hover', ['==', 'Name', Name])
      })

      map.on('mouseleave', 'property-fill', () => {
        map.setFilter('property-fill-hover', ['==', 'Name', ''])
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
