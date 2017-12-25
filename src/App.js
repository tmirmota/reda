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
  lat: 49.25703449385483,
  lng: -123.13180508539645,
  zoom: 11,
  properties: null,
  lngLat: null,
  showZoning: false,
}

class App extends Component {
  state = initialState
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
    const { properties, lngLat, showZoning, zone } = this.state

    const keys = properties ? Object.keys(properties) : []

    return (
      <div className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <div className="col pt-4 sidebar">
            {lngLat && (
              <div>
                <div>
                  {keys.map((key, id) => (<div key={id}>
                    <p>{key}: {properties[key]}</p>
                  </div>))}
                  {zone ? <p>Zone: <a href={zone.url} target="_blank">{zone.name}</a></p> : ''}
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
            'fill-color': '#FFFFFF',
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
            const zoneFeatures = map.queryRenderedFeatures(e.point, { layers: [ 'zoning-fill2']})
            if (zoneFeatures) {
              const { Name, Description } = zoneFeatures[0].properties
              const urlStart = Description.indexOf('zone_url') + 18
              const urlEnd = Description.substring(urlStart).indexOf('</td>') + urlStart
              const url = Description.substring(urlStart, urlEnd)
              zone = { name: Name, url }
            }
          } else if (source === 'census-tracts') {
            console.log(e);
          }

          const filterName = feature.properties[filter]
          map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
          map.setFilter(`${source}-line-hover`, ['==', filter, filterName])

          this.setState({ properties: feature.properties, lngLat: e.lngLat, zone })
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
