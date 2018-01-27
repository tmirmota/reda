import React, { Component } from 'react'

// Containers
import SidebarContainer from '../containers/SidebarContainer'
import MapContainer from '../containers/MapContainer'
import LegendContainer from '../containers/LegendContainer'

// Components
import ErrorMessage from '../components/ErrorMessage'

class Root extends Component {
  render() {
    // if (window.innerWidth <= 768) return <ErrorMessage />
    return (
      <section className="container-fluid h-100 no-bleed">
        <div className="row h-100">
          <SidebarContainer />
          <div className="col">
            <MapContainer />
          </div>
          <LegendContainer />
        </div>
      </section>
    )
  }
}

export default Root
