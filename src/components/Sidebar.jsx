import React from 'react'

// Components
import PropertySidebar from './PropertySidebar'
import RegionSidebar from './RegionSidebar'

// Material UI
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

const Sidebar = props => {
  const {
    zoom,
    filters,
    toggleZoning = null,
    toggleSatellite = null,
    toggleSchools = null,
    toggleFire = null,
    toggleTransit = null,
  } = props
  const { zoning, satellite, schools, fireHydrants, transit } = filters
  return (
    <div className={`col pt-4 sidebar ${!toggleZoning && 'sidebar-side'}`}>
      {zoom > 15 ? (
        <PropertySidebar {...props} />
      ) : (
        <RegionSidebar {...props} />
      )}
      {toggleZoning && (
        <div>
          <FormControlLabel
            control={<Switch checked={zoning} onChange={toggleZoning} />}
            label="Zoning"
          />
          <FormControlLabel
            control={<Switch checked={transit} onChange={toggleTransit} />}
            label="Transit"
          />
          <FormControlLabel
            control={<Switch checked={schools} onChange={toggleSchools} />}
            label="Schools"
          />
          <FormControlLabel
            control={<Switch checked={fireHydrants} onChange={toggleFire} />}
            label="Fire Hydrants"
          />
          <FormControlLabel
            control={<Switch checked={satellite} onChange={toggleSatellite} />}
            label="Satellite"
          />
        </div>
      )}
    </div>
  )
}

export default Sidebar
