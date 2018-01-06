import React from 'react'

// Components
import PropertySidebar from './PropertySidebar'
import RegionSidebar from './RegionSidebar'
import Filters from './Filters'

const Sidebar = props => {
  return (
    <div className="col pt-4 sidebar">
      <div className="d-flex flex-column h-100">
        {props.mapFeatures.zoom > 14 ? (
          <PropertySidebar {...props} />
        ) : (
          <RegionSidebar {...props} />
        )}
        <Filters {...props} />
      </div>
    </div>
  )
}

export default Sidebar
