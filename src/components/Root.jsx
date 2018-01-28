import React, { Component } from 'react'

// Containers
import SidebarContainer from '../containers/SidebarContainer'
import MapContainer from '../containers/MapContainer'
import LegendContainer from '../containers/LegendContainer'
import HeaderContainer from '../containers/HeaderContainer'

// Components
import FocusView from '../components/FocusView'

class Root extends Component {
  render() {
    const { mapFeatures, fetchRents } = this.props
    return (
      <div>
        {/* <HeaderContainer /> */}
        <MapContainer />
        <SidebarContainer />
        <LegendContainer />
        <FocusView
          active={mapFeatures.redoSearch}
          onClick={fetchRents}
          label="Focus View"
        />
      </div>
    )
  }
}

export default Root
