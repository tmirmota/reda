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

const initialState = {
  lat: 49.25703449385483,
  lng: -123.13180508539645,
  zoom: 11,
  name: '',
  description: '',
  lngLat: null,
  showZoning: false
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
          'fill-color': '#FFFFFF'
        }
      })
    } else {
      map.removeLayer('zoning-fill')
    }

    this.setState({ [name]: checked })
  }
  render() {
    const { name, description, lngLat, showZoning } = this.state

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

    let start
    let current
    let box

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/tmirmota/cjb1fqagmg2r82srs6d5s9sew',
      center: [lng, lat],
      zoom
    })

    const popup = new mapboxgl.Popup({
      closeButton: false
    })

    // Disable default box zooming.
    map.boxZoom.disable()

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
        .addSource('zoning', {
          type: 'vector',
          url: 'mapbox://tmirmota.5h7gkfwq'
        })

      // Add Base Layers
      sources.map(({ source, sourceLayer, maxzoom, minzoom }) => {
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
            filter: ['==', 'Name', '']
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
            filter: ['==', 'Name', '']
          },
          'place_label_other'
        )

        map.addLayer(
          {
            id: `${source}-highlighted`,
            source,
            'source-layer': sourceLayer,
            type: 'line',
            paint: {
              'line-color': '#1de9b6'
            },
            filter: ['in', 'FIPS', '']
          },
          'place_label_other'
        )

        map.on('mousemove', `${source}-fill`, e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['properties-highlighted']
          })
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = features.length ? 'pointer' : ''

          if (!features.length) {
            popup.remove()
            return
          }

          const feature = features[0]

          popup
            .setLngLat(e.lngLat)
            .setText(feature.properties.COUNTY)
            .addTo(map)

          console.log(e)

          const { lngLat } = e
          const { Name, Description } = e.features[0].properties

          this.setState({ name: Name, description: Description, lngLat })
          map.setFilter(`${source}-fille-hover`, ['==', 'Name', Name])
          map.setFilter(`${source}-line-hover`, ['==', 'Name', Name])
        })

        map.on('mouseleave', `${source}-fill`, () => {
          map.setFilter(`${source}-fill-hover`, ['==', 'Name', ''])
          map.setFilter(`${source}-line-hover`, ['==', 'Name', ''])
        })
        return true
      })

      const canvas = map.getCanvasContainer()

      const mousePos = e => {
        const rect = canvas.getBoundingClientRect()
        return new mapboxgl.Point(
          e.clientX - rect.left - canvas.clientLeft,
          e.clientY - rect.top - canvas.clientTop
        )
      }

      const mouseDown = e => {
        if (!(e.shiftkey && e.button === 0)) return

        map.dragPan.disable()

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('onkeydown', onKeyDown)

        start = mousePos(e)
      }

      canvas.addEventListener('mousedown', mouseDown, true)

      const onMouseMove = e => {
        current = mousePos(e)

        if (!box) {
          box = document.createElement('div')
          box.classList.add('boxdraw')
          canvas.appendChild(box)
        }
        const minX = Math.min(start.x, current.x),
          maxX = Math.max(start.x, current.x),
          minY = Math.min(start.y, current.y),
          maxY = Math.min(start.y, current.y)

        const pos = `translate(${minX}px,${minY}px)`

        box.style.transform = pos
        box.style.WebkitTransform = pos
        box.style.width = `${maxX - minX}px`
        box.style.height = `${maxY - minY}px`
      }

      const onMouseUp = e => {
        finish([start, mousePos(e)])
      }

      const onKeyDown = e => {
        // If the ESC key is pressed
        if (e.keyCode === 27) finish()
      }

      const finish = bbox => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListerner('onkeydown', onKeyDown)

        if (box) {
          box.parentNode.removeChild(box)
          box = null
        }

        if (bbox) {
          const features = map.queryRenderedFeatures(bbox, {
            layers: ['properties']
          })

          if (features.length >= 1000) {
            return window.alert('Select a smaller number of properties')
          }

          const filter = features.reduce(
            (memo, feature) => {
              memo.push(feature.properties.FIPS)
              return memo
            },
            ['in', 'FIPS']
          )

          map.setFilter('properties-highlighted', filter)
        }
        map.dragPan.enable()
      }

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
