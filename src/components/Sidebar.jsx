import React from 'react'

// Components
import PropertySidebar from './PropertySidebar'
import RegionSidebar from './RegionSidebar'
import Filters from './Filters'

const Sidebar = props => {
  if (props.mapFeatures.zoom > 14) {
    return (
      <div className="col pt-4 sidebar">
        <div className="d-flex flex-column h-100">
          <PropertySidebar {...props} />
          <Filters {...props} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <RegionSidebar {...props} />
        <Filters {...props} className="bottom-left m-3" />
      </div>
    )
  }
}

export default Sidebar
