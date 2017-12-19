import React, { Component } from 'react'
import L from 'leaflet'

// Datasets
import { geoJSONFeature } from './constants/dm-van'
import { data } from './constants/shelter-costs'

import { MAPBOX_KEY } from './constants/apiConstants'
import { apiFetch } from './utils/apiUtils'

const initialState = {
<<<<<<< HEAD
  neighborhood: '',
  rent: ''
=======
  lat: 49.257482642589025,
  lng: -123.16407742426055,
  zoom: 18,
  name: '',
  description: '',
  rent: 0,
  neighborhood: 'TBA'
>>>>>>> 16279de... Add hover effect
}

class App extends Component {
  state = initialState
  mouseOver = async e => {
    const highlightStyle = {
      color: '#1de9b6',
      weight: 3,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: '#1de9b6'
    }

    e.layer.setStyle(highlightStyle)

    const { layer, latlng } = e
    const { id } = layer.feature.properties
    const dm = data.find(({ GeoUID }) => GeoUID === Number(id))

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng.lng}%2C${latlng.lat}.json?access_token=${MAPBOX_KEY}`
    const { json } = await apiFetch(url)

    let neighborhood

    if (json) {
      neighborhood = neighborhoodName(json.features)
    }

    const rent = dm[
      'v_CA16_4901: Average monthly shelter costs for rented dwellings ($)'
    ]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    this.setState({ neighborhood, rent })
  }
  mouseOut = ({ target, layer }) => {
    target.resetStyle(layer)
  }
  style = feature => {
    const color = getColor(feature)

    return {
      fillColor: color,
      fillOpacity: 0.7,
      color: '#d1c4e9',
      opacity: 0.7,
      weight: 1
    }
  }
  zoomLevelChange = e => {
    console.log('zoom level: ', e.target._zoom)
  }
  render() {
    const { name, description, neighborhood, rent } = this.state
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
            <div id="mapid" />
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.myContainer,
      style: 'mapbox://styles/tmirmota/cjb1fqagmg2r82srs6d5s9sew',
      center: [lng, lat],
      zoom
    })

    map.on('load', () => {
      map.addSource('properties', {
        type: 'vector',
        url: 'mapbox://tmirmota.69r2qz2u'
      })

      const sourceLayer = 'property_parcel_polygonsgeojson'

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
