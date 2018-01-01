import React, { Component } from 'react'
import './App.css'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'

// Material UI
import Button from 'material-ui/Button'
import Switch from 'material-ui/Switch'
import { FormControlLabel } from 'material-ui/Form'

// Components
import Sidebar from './components/Sidebar'

// Constants
import { mapboxAccessToken, sources } from './constants/MapboxConstants'
import initialState from './constants/InitialState'

// Utilities
import { apiFetch } from './utils/apiUtils'
import { addSources, addLayers } from './utils/mapUtils'

mapboxgl.accessToken = mapboxAccessToken

const host = 'https://reda-188106.appspot.com'

class App extends Component {
  state = initialState
  reverseGeocode = async () => {
    const { lng, lat, location } = this.state
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
    const { json } = await apiFetch(url)
    if (json) {
      let neighborhood
      let place

      json.features.map(feature => {
        const type = feature.place_type[0]
        if (type === 'neighborhood') return (neighborhood = feature.text)
        if (type === 'place') return (place = feature.text)
      })

      location['neighborhood'] = neighborhood
      location['city'] = place

      this.setState({ location })
    }
  }
  requestProperty = async newPcoord => {
    const { property } = this.state
    if (this.state.pcoord !== newPcoord) {
      this.setState({ pcoord: newPcoord })

      const url = `${host}/land-coordinate/${newPcoord}`
      const { json } = await apiFetch(url)

      if (json) {
        property['yearBuilt'] = json[0]['YEAR_BUILT']
        property['propertyTax'] = json[0]['TAX_LEVY']
        property['assessmentYear'] = json[0]['TAX_ASSESSMENT_YEAR']
        property['landAssessment'] = json[0]['CURRENT_LAND_VALUE']
        property['buildingAssessment'] = json[0]['CURRENT_IMPROVEMENT_VALUE']
        property['prevLandAssessment'] = json[0]['PREVIOUS_LAND_VALUE']
        property['bigImprovYear'] = json[0]['BIG_IMPROVEMENT_YEAR']
        property['zoneCategory'] = json[0]['ZONE_CATEGORY']
        property['totalAssessment'] =
          property.landAssessment + property.buildingAssessment

        this.setState({ property })
      }
    }
  }
  requestHouseholdIncome = async ctuid => {
    const { json } = await apiFetch(`${host}/total-household-income/${ctuid}`)
    if (json) {
      console.log(json)
    }
  }
  toggleZoning = name => (event, checked) => {
    const { map } = this.state

    if (checked) {
      map.addLayer({
        id: 'zoning-line',
        source: 'zoning',
        'source-layer': 'zoning_districtsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'line',
        paint: {
          'line-color': '#f412da'
        }
      })
    } else {
      map.removeLayer('zoning-line')
    }

    this.setState({ [name]: checked })
  }
  removeSelection = () => {
    const { selectedProperty, map } = this.state
    const { layer, filter } = selectedProperty
    map.setFilter(layer, ['==', filter, ''])
    this.setState({ selectedProperty: null })
  }
  toggleSatellite = (event, checked) => {
    const { map } = this.state

    const layers = map.getStyle().layers

    const sourceIds = ['census-tracts', 'properties', 'zoning']

    const style = `mapbox://styles/mapbox/${checked ? 'satellite' : 'basic'}-v9`
    map.setStyle(style)
    map.on('style.load', () => {
      const noSources = !map.getSource('census-tracts')
      if (noSources) {
        this.addSources(map)
        layers.map(layer => {
          if (sourceIds.includes(layer.source)) {
            map.addLayer(layer)
          }
          return true
        })
      }
    })
    this.setState({ satellite: checked })
  }
  renderLayers = map => {
    addSources(map)

    map.addLayer({
      id: 'zoning-fill2',
      source: 'zoning',
      'source-layer': 'zoning_districtsgeojson',
      minzoom: 11,
      maxzoom: 22,
      type: 'fill',
      paint: {
        'fill-opacity': 0.0,
        'fill-color': '#FFFFFF'
      }
    })

    sources.map(src => {
      const { source, sourceLayer, maxzoom, minzoom, filter } = src

      addLayers(map, src)

      map.on('click', `properties-fill`, e => {
        console.log('Selected Property', e)
        const feature = e.features[0]

        const filterName = feature.properties[filter]
        const layer = `${source}-fill-click`
        if (filterName) {
          map.setFilter(layer, ['==', filter, filterName])
          const selectedProperty = {
            filter,
            layer
          }
          this.setState({ selectedProperty })
        }
      })
      map.on('mousemove', `${source}-fill`, e => {
        if (this.state.selectedProperty) {
          console.log('Property is already selected')
          return false
        }

        const feature = e.features[0]

        const { source } = feature.layer

        let zone
        if (source === 'properties') {
          const { Description } = feature.properties
          const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
          const indexStdStreet = Description.indexOf('STD_STREET:')
          const indexPcoord = Description.indexOf('PCOORD:')
          const indexSiteId = Description.indexOf('SITE_ID:')
          const pcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)

          const streetNumber = Description.substring(
            indexCivicNum + 13,
            indexStdStreet - 1
          )
          const streetName = Description.substring(
            indexStdStreet + 11,
            indexPcoord - 1
          )

          const propertyAddress = {
            number: streetNumber,
            street: streetName
          }

          this.requestProperty(pcoord)

          const zoneFeatures = map.queryRenderedFeatures(e.point, {
            layers: ['zoning-fill2']
          })
          if (zoneFeatures[0]) {
            const { Name, Description } = zoneFeatures[0].properties
            const urlStart = Description.indexOf('zone_url') + 18
            const urlEnd =
              Description.substring(urlStart).indexOf('</td>') + urlStart
            const url = `http://bylaws.vancouver.ca/zoning/${Name}.pdf`
            zone = { name: Name, url }
          }
          this.setState({ propertyAddress })
        } else if (source === 'census-tracts') {
          console.log(feature)
          const ctuid = feature.properties['CTUID']
          this.requestHouseholdIncome(ctuid)
        }

        const filterName = feature.properties[filter]
        map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
        map.setFilter(`${source}-line-hover`, ['==', filter, filterName])

        this.reverseGeocode(e.lngLat)

        this.setState({
          properties: feature.properties,
          lngLat: e.lngLat,
          zone
        })
      })
      map.on('mouseleave', `${source}-fill`, () => {
        map.setFilter(`${source}-fill-hover`, ['==', filter, ''])
        map.setFilter(`${source}-line-hover`, ['==', filter, ''])
      })
      return true
    })

    this.setState({ map })
  }
  render() {
    const { filters, location, property } = this.state

    if (window.innerWidth <= 768) {
      return (
        <div className="container text-center mt-2">
          <h2>Head to your nearest desktop computer!</h2>
          <p>
            Sorry, Reda's interface isn't quite ready for mobile devices like
            yours.
          </p>
        </div>
      )
    }

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <Sidebar filters={filters} property={property} location={location} />
          <div className="col">
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
    if (window.innerWidth <= 768) return false

    const { lng, lat, zoom } = this.state

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/basic-v9',
      center: [lng, lat],
      zoom
    })

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: 'ca',
        placeholder: 'Search address, street, neighborhood or city'
      })
    )

    map.on('load', () => {
      this.renderLayers(map)
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
