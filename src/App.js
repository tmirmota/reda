import React, { Component } from 'react'
import L from 'leaflet'

// Datasets
import { geoJSONFeature } from './constants/dm-van'
import { data } from './constants/shelter-costs'

import { MAPBOX_KEY } from './constants/apiConstants'
import { apiFetch } from './utils/apiUtils'
import { neighborhoodName } from './utils/placeUtils'
import { getColor } from './utils/styleUtils'

const initialState = {
  neighborhood: '',
  rent: ''
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
    fillOpacity: .7,
    color: '#d1c4e9',
    opacity: .7,
    weight: 1
    }
  }
  render() {
    const { neighborhood, rent } = this.state
    const rentTitle = `Single Dwelling Rent: $${rent} / month`

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <div className="col mt-4">
            <h3>{neighborhood}</h3>
            <hr />
            <div className="lead">
              <p>{rentTitle}</p>
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
    const myMap = L.map('mapid').setView(
      [49.257482642589025, -123.16407742426055],
      12
    )

    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MAPBOX_KEY}`,
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        accessToken: MAPBOX_KEY
      }
    ).addTo(myMap)

    const dmLayer = L.geoJSON(geoJSONFeature, {
      style: this.style
    }).addTo(myMap)
    dmLayer.on('mouseover', this.mouseOver)
    dmLayer.on('mouseout', this.mouseOut)
  }
}

export default App
