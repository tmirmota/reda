import React, { Component } from 'react'
import './App.css'

// Mapbox
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'

// Components
import Sidebar from './components/Sidebar'

// Constants
import {
  mapboxAccessToken,
  sources,
  zoneFill,
  zoneLine
} from './constants/MapboxConstants'
import initialState from './constants/InitialState'

// Utilities
import { hostReda, hostMapbox, apiFetch } from './utils/apiUtils'
import { addSources, addLayers } from './utils/mapUtils'

mapboxgl.accessToken = mapboxAccessToken

class App extends Component {
  state = initialState
  reverseGeocode = async lngLat => {
    console.log('property request')
    const { lng, lat } = this.state
    const url = `${hostMapbox}/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
    const { json } = await apiFetch(url)
    if (json) {
      let neighborhood
      let city

      json.features.map(feature => {
        const type = feature.place_type[0]
        if (type === 'neighborhood') return (neighborhood = feature.text)
        if (type === 'place') return (city = feature.text)
        return true
      })

      this.setState(prevState => ({
        property: { ...prevState.property, neighborhood, city }
      }))
    }
  }
  requestProperty = async pcoord => {
    const url = `${hostReda}/land-coordinate/${pcoord}`
    const { json } = await apiFetch(url)

    if (json) {
      if (json.length > 0) {
        const yearBuilt = json[0]['YEAR_BUILT']
        const propertyTax = json[0]['TAX_LEVY']
        const assessmentYear = json[0]['TAX_ASSESSMENT_YEAR']
        const landAssessment = json[0]['CURRENT_LAND_VALUE']
        const buildingAssessment = json[0]['CURRENT_IMPROVEMENT_VALUE']
        const prevLandAssessment = json[0]['PREVIOUS_LAND_VALUE']
        const bigImprovYear = json[0]['BIG_IMPROVEMENT_YEAR']
        const zone = json[0]['ZONE_NAME']
        const zoneCategory = json[0]['ZONE_CATEGORY']
        const legalType = json[0]['LEGAL_TYPE']
        const totalAssessment = landAssessment + buildingAssessment

        const zoneUrl = `http://bylaws.vancouver.ca/zoning/${zone}.pdf`

        this.setState(prevState => ({
          property: {
            ...prevState.property,
            yearBuilt,
            propertyTax,
            assessmentYear,
            landAssessment,
            buildingAssessment,
            prevLandAssessment,
            bigImprovYear,
            zone,
            zoneUrl,
            zoneCategory,
            legalType,
            totalAssessment
          }
        }))
      }
    }
  }
  requestHouseholdIncome = async ctuid => {
    const url = `${hostReda}/total-household-income/${ctuid}`
    const { json } = await apiFetch(url)
    if (json) {
      if (json.length > 0) {
        const res = json[0]
        const altGeoCode = res['ALT_GEO_CODE']
        const medianTotalHouseholdIncome = res['MEDIAN_TOTAL_HOUSEHOLD_INCOME']
        this.setState(prevState => ({
          ct: {
            ...prevState.ct,
            altGeoCode,
            medianTotalHouseholdIncome
          }
        }))
      } else {
        this.setState(prevState => ({
          ct: {
            ...prevState.ct,
            medianTotalHouseholdIncome:
              initialState.ct.medianTotalHouseholdIncome
          }
        }))
      }
    }
  }
  requestRent = async ctuid => {
    const url = `${hostReda}/rental-ct/${ctuid}`
    const { json } = await apiFetch(url)
    if (json) {
      if (json.length > 0) {
        const res = json[0]
        const averageRent = {
          bachelor: res['AVERAGE_RENT_BACHELOR'],
          bedroom1: res['AVERAGE_RENT_BEDROOM_1'],
          bedroom2: res['AVERAGE_RENT_BEDROOM_2'],
          bedroom3: res['AVERAGE_RENT_BEDROOM_3_PLUS'],
          total: res['AVERAGE_RENT_TOTAL']
        }
        const medianRent = {
          bachelor: res['MEDIAN_RENT_BACHELOR'],
          bedroom1: res['MEDIAN_RENT_BEDROOM_1'],
          bedroom2: res['MEDIAN_RENT_BEDROOM_2'],
          bedroom3: res['MEDIAN_RENT_BEDROOM_3_PLUS'],
          total: res['MEDIAN_RENT_TOTAL']
        }
        const vacancyRate = {
          bachelor: res['VACANCY_RATE_BACHELOR'],
          bedroom1: res['VACANCY_RATE_BEDROOM_1'],
          bedroom2: res['VACANCY_RATE_BEDROOM_2'],
          bedroom3: res['VACANCY_RATE_BEDROOM_3_PLUS'],
          total: res['VACANCY_RATE_TOTAL']
        }
        this.setState(prevState => ({
          ct: {
            ...prevState.ct,
            averageRent,
            medianRent,
            vacancyRate
          }
        }))
      } else {
        this.setState(prevState => ({
          ct: {
            ...prevState.ct,
            averageRent: initialState.ct.averageRent,
            medianRent: initialState.ct.medianRent,
            vacancyRate: initialState.ct.vacancyRate
          }
        }))
      }
    }
  }
  toggleZoning = (event, checked) => {
    const { map, filters } = this.state
    if (checked) {
      map.addLayer(zoneLine)
    } else {
      map.removeLayer('zoning-line')
    }
    filters['zoning'] = checked
    this.setState({ filters })
  }
  toggleTransit = (event, checked) => {
    const { map, popup, filters } = this.state
    if (checked) {
      map.addLayer({
        id: 'transit-lines',
        source: 'transit-lines',
        'source-layer': 'rapid_transit_linegeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'line',
        paint: {
          'line-color': '#128ef4',
          'line-width': 2
        }
      })
      map.addLayer({
        id: 'transit-stations',
        source: 'transit-stations',
        'source-layer': 'rapid_transit_stationsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'circle',
        paint: {
          'circle-radius': {
            base: 1.4,
            stops: [[12, 2], [22, 180]]
          },
          'circle-color': 'rgb(214, 21, 21)'
        }
      })
      map.on('mousemove', 'transit-stations', e => {
        map.getCanvas().style.cursor = 'pointer'

        const feature = e.features[0]
        const { Name } = feature.properties

        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(Name)
          .addTo(map)
      })
      map.on('mouseleave', 'transit-stations', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
    } else {
      map.removeLayer('transit-lines')
      map.removeLayer('transit-stations')
    }
    filters['transit'] = checked
    this.setState({ filters })
  }
  toggleFire = (event, checked) => {
    const { map, filters } = this.state
    if (checked) {
      map.addLayer({
        id: 'fire-hydrants',
        source: 'fire-hydrants',
        'source-layer': 'water_hydrantsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'circle',
        paint: {
          'circle-radius': {
            base: 2,
            stops: [[12, 2], [22, 180]]
          },
          'circle-color': 'rgb(214, 21, 21)'
        }
      })
    } else {
      map.removeLayer('fire-hydrants')
    }
    filters['fireHydrants'] = checked
    this.setState({ filters })
  }
  toggleSchools = (event, checked) => {
    const { map, popup, filters } = this.state
    if (checked) {
      map.addLayer({
        id: 'school-points',
        source: 'schools',
        'source-layer': 'schoolsgeojson',
        minzoom: 11,
        maxzoom: 22,
        type: 'circle',
        paint: {
          'circle-radius': {
            base: 1.5,
            stops: [[12, 2], [22, 180]]
          },
          'circle-color': '#f412da'
        }
      })

      map.on('mousemove', 'school-points', e => {
        map.getCanvas().style.cursor = 'pointer'

        const feature = e.features[0]
        const { Description } = feature.properties

        const indexName = Description.indexOf('NAME:')
        const indexAddress = Description.indexOf('ADDRESS:')
        const indexCategory = Description.indexOf('SCHOOL_CATEGORY:')

        const name = Description.substring(indexName + 5, indexAddress)
        const category = Description.substring(indexCategory + 16)

        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(`<div>${name}<br/>${category}</div>`)
          .addTo(map)
      })
      map.on('mouseleave', 'school-points', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
    } else {
      map.removeLayer('school-points')
    }
    filters['schools'] = checked
    this.setState({ filters })
  }
  toggleSatellite = (event, checked) => {
    const { map, filters } = this.state

    const layers = map.getStyle().layers

    const sourceIds = [
      'census-tracts',
      'dissemination_area',
      'schools',
      'fire-hydrants',
      'transit-lines',
      'transit-stations',
      'properties',
      'zoning'
    ]

    const style = `mapbox://styles/mapbox/${checked ? 'satellite' : 'basic'}-v9`
    map.setStyle(style)
    map.on('style.load', () => {
      const noSources = !map.getSource('census-tracts')
      if (noSources) {
        addSources(map)
        layers.map(layer => {
          if (sourceIds.includes(layer.source)) {
            map.addLayer(layer)
          }
          return true
        })
      }
    })
    filters['satellite'] = checked
    this.setState({ filters })
  }
  renderLayers = map => {
    addSources(map)

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

    map.addLayer(zoneFill)

    map.on('click', `properties-fill`, e => {
      const feature = e.features[0]

      const { Name, Description } = feature.properties
      const layer = `properties-fill-click`

      const indexPcoord = Description.indexOf('PCOORD:')
      const indexSiteId = Description.indexOf('SITE_ID:')
      const newPcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)

      const { selectedProperty } = this.state
      const pcoord = selectedProperty ? selectedProperty.pcoord : null
      if (pcoord === newPcoord) {
        map.setFilter(layer, ['==', 'Name', ''])
        this.setState({ selectedProperty: null })
      } else if (Name) {
        map.setFilter(layer, ['==', 'Name', Name])
        this.setState({ selectedProperty: this.state.property })
      }
    })

    sources.map(src => {
      const { source, filter } = src

      addLayers(map, src)

      map.on('mousemove', `${source}-fill`, e => {
        const feature = e.features[0]

        const { source } = feature.layer

        if (source === 'properties') {
          const { Description } = feature.properties
          const indexCivicNum = Description.indexOf('CIVIC_NUMBER:')
          const indexStdStreet = Description.indexOf('STD_STREET:')
          const indexPcoord = Description.indexOf('PCOORD:')
          const indexSiteId = Description.indexOf('SITE_ID:')
          const pcoord = Description.substring(indexPcoord + 7, indexSiteId - 1)

          const number = Description.substring(
            indexCivicNum + 13,
            indexStdStreet - 1
          )
          const street = Description.substring(
            indexStdStreet + 11,
            indexPcoord - 1
          )
          if (this.state.property.pcoord !== pcoord) {
            this.requestProperty(pcoord)
            this.reverseGeocode(e.lngLat)
            this.setState(prevState => ({
              property: { ...prevState.property, number, street, pcoord }
            }))
          }
        } else if (
          source === 'census-tracts' ||
          source === 'dissemination_area'
        ) {
          const ctuid = feature.properties['CTUID']
          const ctname = feature.properties['CTNAME']

          if (this.state.ct.ctuid !== ctuid) {
            this.requestHouseholdIncome(ctuid)
            this.reverseGeocode(e.lngLat)
          }

          if (this.state.ct.ctname !== ctname) {
            this.requestRent(ctname)
          }

          this.setState(prevState => ({
            ct: {
              ...prevState.ct,
              ctuid,
              ctname
            }
          }))
        }

        const filterName = feature.properties[filter]
        map.setFilter(`${source}-fill-hover`, ['==', filter, filterName])
        map.setFilter(`${source}-line-hover`, ['==', filter, filterName])
      })
      map.on('mouseleave', `${source}-fill`, () => {
        map.setFilter(`${source}-fill-hover`, ['==', filter, ''])
        map.setFilter(`${source}-line-hover`, ['==', filter, ''])
        this.setState({ property: initialState.property })
      })
      return true
    })

    this.setState({ map, popup })
  }
  render() {
    const { filters, property, selectedProperty, ct, zoom } = this.state

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
          <Sidebar
            zoom={zoom}
            filters={filters}
            property={selectedProperty ? selectedProperty : property}
            region={ct}
            toggleZoning={this.toggleZoning}
            toggleSatellite={this.toggleSatellite}
            toggleSchools={this.toggleSchools}
            toggleFire={this.toggleFire}
            toggleTransit={this.toggleTransit}
          />
          {selectedProperty &&
            property.pcoord && (
              <Sidebar
                zoom={zoom}
                filters={filters}
                property={property}
                region={ct}
              />
            )}
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
