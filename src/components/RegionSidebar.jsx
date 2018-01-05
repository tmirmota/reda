import React from 'react'
import Button from 'material-ui/Button'

import { toCAD } from '../utils/formatUtils'

const RegionSidebar = ({ property, polygon, addDataLayer }) => {
  const { neighborhood, city, zone, zoneUrl, zoneCategory } = property
  const {
    averageRent,
    medianRent,
    vacancyRate,
    medianTotalHouseholdIncome,
  } = polygon
  const vacancyStr = vacancyRate.total ? vacancyRate.total / 100 + '%' : ''
  return (
    <div>
      <div className="lead">
        {neighborhood}
        {neighborhood && city && ', '}
      </div>
      <div className="text-muted">{city}</div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Rental</strong>
      </div>
      <div>
        <span>Average Rent</span>
        <span className="float-right">{toCAD(averageRent.total)}</span>
      </div>
      <Button onClick={addDataLayer}>Heat Map</Button>
    </div>
  )
}

export default RegionSidebar
