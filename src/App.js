import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import './App.css'

import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'
import { FormControlLabel } from 'material-ui/Form'

import { apiFetch } from './utils/apiUtils'

mapboxgl.accessToken =
  'pk.eyJ1IjoidG1pcm1vdGEiLCJhIjoiY2phenpkeHl1MW5xcTJ2bWsxa2J2c3B1NCJ9.VzfA7MRGj7E8mdTSBdA4Rw'

const sources = [
  {
    source: 'properties',
    sourceLayer: 'property_parcel_polygonsgeojson',
    minzoom: 14,
    maxzoom: 19,
    type: 'vector',
    url: 'tmirmota.69r2qz2u',
    filter: 'Name'
  },
  {
    source: 'census-tracts',
    sourceLayer: 'census_tracts_2016geojson',
    minzoom: 9,
    maxzoom: 14,
    type: 'vector',
    url: 'tmirmota.3u8wgv7d',
    filter: 'CTUID'
  }
]

const initialState = {
  lat: 49.2532,
  lng: -123.1113,
  zoom: 17,
  properties: null,
  lngLat: null,
  showZoning: false,
  folio: null,
  propertyDetails: null,
  propertyAddress: null,
  selectedProperty: null,
  satellite: false,
  neighborhood: null,
  place: null
}

const styles = {
  switch: { height: '75%' }
}

class App extends Component {
  state = initialState
  componentWillMount() {
    this.requestProperty(739184050000)
  }
  reverseGeocode = async lngLat => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
    const { json } = await apiFetch(url)
    if (json) {
      let neighborhood
      let place
      json.features.map(feature => {
        const type = feature.place_type[0]
        if (type === 'neighborhood') {
          neighborhood = feature.text
        } else if (type === 'place') {
          place = feature.text
        }
      })
      this.setState({ neighborhood, place })
    }
  }
  requestProperty = async newPcoord => {
    const { pcoord } = this.state

    if (pcoord !== newPcoord) {
      this.setState({ pcoord: newPcoord })
      const { json } = await apiFetch(
        `https://reda-188106.appspot.com/land-coordinate/${newPcoord}`
      )

      if (json) {
        this.setState({ propertyDetails: json[0] })
      } else {
        return false
      }
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
  addSources = map => {
    map
      .addSource('census-tracts', {
        type: 'vector',
        url: 'mapbox://tmirmota.3u8wgv7d'
      })
      .addSource('properties', {
        type: 'vector',
        url: 'mapbox://tmirmota.69r2qz2u'
      })
      .addSource('zoning', {
        type: 'vector',
        url: 'mapbox://tmirmota.5h7gkfwq'
      })
  }
  renderLayers = map => {
    const fillColor = '#3f51b5'

    this.addSources(map)

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

    sources.map(({ source, sourceLayer, maxzoom, minzoom, filter }) => {
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
        filter: ['==', filter, '']
      })
      map.addLayer({
        id: `${source}-line-hover`,
        source,
        'source-layer': sourceLayer,
        type: 'line',
        paint: {
          'line-color': '#1de9b6'
        },
        filter: ['==', filter, '']
      })
      map.addLayer({
        id: `${source}-fill-click`,
        source,
        'source-layer': sourceLayer,
        type: 'fill',
        paint: {
          'fill-color': '#e9291d'
        },
        filter: ['==', filter, '']
      })

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
    const {
      lngLat,
      showZoning,
      zone,
      propertyDetails,
      propertyAddress,
      selectedProperty,
      satellite,
      neighborhood,
      place
    } = this.state

    const { classes } = this.props

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
          <div className="col pt-4 sidebar">
            {lngLat && (
              <div>
                <div>
                  <div>
                    {propertyAddress ? (
                      <div className="lead">
                        {propertyAddress.number} {propertyAddress.street}
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="text-muted">
                      {neighborhood}
                      {neighborhood && place && ', '}
                      {place}
                    </div>
                  </div>
                  <hr />
                  {propertyDetails && (
                    <div>
                      <div>
                        <div className="sidebar-heading">
                          <strong className="text-uppercase">
                            Property Details
                          </strong>
                        </div>
                        <div>
                          <span>Year Built </span>
                          <span className="float-right">
                            {propertyDetails['YEAR_BUILT']}
                          </span>
                        </div>
                        <div>
                          <span>Property Taxes </span>
                          <span className="float-right">
                            ${propertyDetails['TAX_LEVY']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div className="sidebar-heading">
                          <strong className="text-uppercase">Assessment</strong>
                          <span className="float-right text-muted">
                            <em>{propertyDetails['TAX_ASSESSMENT_YEAR']}</em>
                          </span>
                        </div>
                        <strong>
                          <span>Total Value</span>
                          <span className="float-right">
                            ${(propertyDetails['CURRENT_LAND_VALUE'] + propertyDetails['CURRENT_IMPROVEMENT_VALUE'])
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </strong>
                        <div>
                          <span>Land</span>
                          <span className="float-right">
                            ${propertyDetails['CURRENT_LAND_VALUE']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                        <div>
                          <span>Building</span>
                          <span className="float-right">
                            ${propertyDetails['CURRENT_IMPROVEMENT_VALUE']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted">Prev. Land Value </span>
                          <span className="float-right text-muted">
                            ${propertyDetails['PREVIOUS_LAND_VALUE']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted">
                            Big Improvement Year
                          </span>
                          <span className="float-right text-muted">
                            {propertyDetails['BIG_IMPROVEMENT_YEAR']}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div>
                          <div className="sidebar-heading">
                            <strong className="text-uppercase">Zoning</strong>
                            <span className="float-right">
                              <Switch
                                checked={showZoning}
                                onChange={this.toggleZoning('showZoning')}
                                classes={{ default: classes.switch }}
                              />
                            </span>
                          </div>
                        </div>
                        <div>
                          {zone ? (
                            <a href={zone.url} target="_blank">
                              {zone.name}
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                        <div>{propertyDetails['ZONE_CATEGORY']}</div>
                        <div>
                          <span>Legal Type: </span>
                          <span className="text-capitalize">
                            {propertyDetails['LEGAL_TYPE']}
                          </span>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={satellite}
                        onChange={this.toggleSatellite}
                      />
                    }
                    label="Satellite"
                  />
                  {selectedProperty && (
                    <div className="text-center">
                      <Button color="accent" onClick={this.removeSelection}>
                        Remove Selection
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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

export default withStyles(styles)(App)
