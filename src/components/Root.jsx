import React, { Component } from 'react'
import '../App.css'

// Containers
import SidebarContainer from '../containers/SidebarContainer'
import MapContainer from '../containers/MapContainer'

class Root extends Component {
  render() {
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
      <section className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <SidebarContainer />
          <MapContainer />
        </div>
      </section>
    )
  }
}

export default Root

// class App extends Component {
//   state = initialState
//   reverseGeocode = async lngLat => {
//     const url = `${hostMapbox}/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
//     const { json } = await apiFetch(url)
//     if (json) {
//       let neighborhood
//       let city
//
//       json.features.map(feature => {
//         const type = feature.place_type[0]
//         if (type === 'neighborhood') return (neighborhood = feature.text)
//         if (type === 'place') return (city = feature.text)
//         return true
//       })
//
//       this.setState(prevState => ({
//         property: { ...prevState.property, neighborhood, city }
//       }))
//     }
//   }
// requestHouseholdIncome = async ctuid => {
//   const url = `${hostReda}/total-household-income/${ctuid}`
//   const { json } = await apiFetch(url)
//   if (json) {
//     if (json.length > 0) {
//       const json[0] = json[0]
//
//       this.setState(prevState => ({
//         ct: {
//           ...prevState.ct,
//           altGeoCode,
//           medianTotalHouseholdIncome
//         }
//       }))
//     } else {
//       this.setState(prevState => ({
//         ct: {
//           ...prevState.ct,
//           medianTotalHouseholdIncome:
//             initialState.ct.medianTotalHouseholdIncome
//         }
//       }))
//     }
//   }
// }
// requestRent = async ctuid => {
//   const url = `${hostReda}/rental-ct/${ctuid}`
//   const { json } = await apiFetch(url)
//   if (json) {
//     if (json.length > 0) {
//
//       this.setState(prevState => ({
//         ct: {
//           ...prevState.ct,
//           averageRent,
//           medianRent,
//           vacancyRate
//         }
//       }))
//     } else {
//       this.setState(prevState => ({
//         ct: {
//           ...prevState.ct,
//           averageRent: initialState.ct.averageRent,
//           medianRent: initialState.ct.medianRent,
//           vacancyRate: initialState.ct.vacancyRate
//         }
//       }))
//     }
//   }
// }
