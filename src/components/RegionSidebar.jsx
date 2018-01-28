import React from 'react'

import { toCAD } from '../utils/formatUtils'
import { typeFormLink } from '../constants/MapConstants'

// Material UI
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'

const RegionSidebar = ({ rent, property, mapFeatures }) => {
  if (!rent.average_price) return false
  const { neighborhood, city } = property
  const { bedrooms, redoSearch } = mapFeatures
  return (
    <div className="census-tract top-left p-4 m-4 shadow rounded fixed-w-300 d-flex flex-column">
      <h4>
        {neighborhood}
        {neighborhood && city && ', '}
      </h4>
      <div className="lead">
        <span>Average Rent</span>
        <span className="float-right">{toCAD(rent.average_price)}</span>
      </div>

      <div className="text-muted">
        <span># of Rentals</span>
        <span className="float-right">{rent.number_of_rentals}</span>
      </div>

      {rent.average_sqft > 0 && (
        <div className="lead mt-2">
          <span>Average Size</span>
          <span className="float-right">
            {rent.average_sqft} ft<sup>2</sup>
          </span>
        </div>
      )}
    </div>
  )
}

export default RegionSidebar
