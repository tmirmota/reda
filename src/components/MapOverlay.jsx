import React from 'react'
import FocusView from './FocusView'
import SidebarContainer from '../containers/SidebarContainer'
import LegendContainer from '../containers/LegendContainer'

const MapOverlay = () => {
  return (
    <div>
      <SidebarContainer />
      <LegendContainer />
      <FocusView
        // active={mapFeatures.redoSearch}
        // onClick={fetchRents}
        label="Focus View"
      />
    </div>
  )
}

export default MapOverlay
