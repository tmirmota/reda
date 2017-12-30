import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'

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
  lat: 49.26938985956605,
  lng: -123.14345477018412,
  zoom: 17,
  properties: null,
  lngLat: null,
  showZoning: false,
  folio: null,
  propertyDetails: null,
  propertyAddress: null
}

class App extends Component {
  requestProperty = async newFolio => {
    const { folio } = this.state

    if (folio !== newFolio) {
      const { json } = await fetch(
        `https://reda-188106.appspot.com/property/${newFolio}`
      )
        .then(res => res.json())
        .then(json => ({ json }))
        .catch(err => console.log(err))

      if (json) {
        console.log(json)
        this.setState({ folio: newFolio, propertyDetails: json[0] })
      } else {
        this.setState({ folio: newFolio })
      }
    }
  }
  state = initialState
  componentWillMount() {
    this.requestProperty(739184050000)
  }
  toggleZoning = ({ target }) => {
    const { map } = this.state
    const { name, checked } = target

    if (checked) {
      map.addLayer({
        id: 'zoning-fill',
        source: 'zoning',
        'source-layer': 'zoning_districtsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'fill',
        paint: {
          'fill-opacity': 0.2,
          'fill-color': '#FFFFFF',
          'fill-outline-color': '#f412da'
        }
      })
    } else {
      map.removeLayer('zoning-fill')
    }

    this.setState({ [name]: checked })
  }
  render() {
    const {
      properties,
      lngLat,
      showZoning,
      zone,
      propertyDetails,
      propertyAddress
    } = this.state

    const propertiesKeys = properties ? Object.keys(properties) : []

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <div className="col-2 pt-4 sidebar">
            {lngLat && (
              <div>
                <div>
                  <div>
                    {propertyAddress ? (
                      <strong>
                        {propertyAddress.number} {propertyAddress.street}
                      </strong>
                    ) : (
                      ''
                    )}
                    <div>Yaletown</div>
                  </div>
                  <hr />
                  {propertyDetails && (
                    <div>
                      <div>
                        <strong className="text-uppercase">Assessment</strong>
                        <div>
                          <span>Land Value: </span>
                          <span>
                            ${propertyDetails['CURRENT_LAND_VALUE']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                        <div>
                          <span>Improvement Value: </span>
                          <span>
                            ${propertyDetails['CURRENT_IMPROVEMENT_VALUE']
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                        <div>
                          <span>Year Built: </span>
                          <span>{propertyDetails['YEAR_BUILT']}</span>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <strong className="text-uppercase">Zoning</strong>
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
                  {propertiesKeys.map((key, id) => (
                    <div key={id}>
                      <p>
                        {key}: {properties[key]}
                      </p>
                    </div>
                  ))}
                  <p>
                    Lat: {lngLat.lat}
                    <br />Lng: {lngLat.lng}
                  </p>
                </div>
                <div>
                  <label>
                    Show Zoning:{' '}
                    <input
                      name="showZoning"
                      type="checkbox"
                      checked={showZoning}
                      onChange={this.toggleZoning}
                    />
                  </label>
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
        map.addLayer(
          {
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
          },
          'place_label_other'
        )

        map.addLayer(
          {
            id: `${source}-line`,
            source,
            'source-layer': sourceLayer,
            minzoom,
            maxzoom,
            type: 'line',
            paint: {
              'line-color': '#7986cb'
            }
          },
          'place_label_other'
        )

        map.addLayer(
          {
            id: `${source}-fill-hover`,
            source,
            'source-layer': sourceLayer,
            type: 'fill',
            paint: {
              'fill-opacity': 0.5,
              'fill-color': '#1de9b6'
            },
            filter: ['==', filter, '']
          },
          'place_label_other'
        )

        map.addLayer(
          {
            id: `${source}-line-hover`,
            source,
            'source-layer': sourceLayer,
            type: 'line',
            paint: {
              'line-color': '#1de9b6'
            },
            filter: ['==', filter, '']
          },
          'place_label_other'
        )

        map.on('mousemove', `${source}-fill`, e => {
          const feature = e.features[0]

          const { source } = feature.layer

          let zone
          if (source === 'properties') {
            const { Description } = feature.properties
            const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
            const indexStdStreet = Description.indexOf('STD_STREET:')
            const indexPcoord = Description.indexOf('PCOORD:')
            const indexSiteId = Description.indexOf('SITE_ID:')
            const pcoord = Description.substring(
              indexPcoord + 7,
              indexSiteId - 1
            )

            const folio = pcoord * Math.pow(10, 12 - pcoord.length)
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

            this.requestProperty(folio)

            const zoneFeatures = map.queryRenderedFeatures(e.point, {
              layers: ['zoning-fill2']
            })
            if (zoneFeatures) {
              const { Name, Description } = zoneFeatures[0].properties
              const urlStart = Description.indexOf('zone_url') + 18
              const urlEnd =
                Description.substring(urlStart).indexOf('</td>') + urlStart
              const url = Description.substring(urlStart, urlEnd)
              zone = { name: Name, url }
            }
            this.setState({ propertyAddress })
          } else if (source === 'census-tracts') {
            console.log(e)
          }

          const filterName = feature.properties[filter]
          map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
          map.setFilter(`${source}-line-hover`, ['==', filter, filterName])

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
