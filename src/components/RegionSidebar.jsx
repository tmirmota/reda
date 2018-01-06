import React from 'react'

import { toCAD } from '../utils/formatUtils'

const RegionSidebar = ({ property, polygon }) => {
  const { neighborhood, city } = property
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
      <div>
        <span>Median Rent</span>
        <span className="float-right">{toCAD(medianRent.total)}</span>
      </div>
      <div>
        <span>Vancancy Rate</span>
        <span className="float-right">{vacancyStr}</span>
      </div>
      <div>
        <span>Median Household Income</span>
      </div>
      <div className="float-right">{toCAD(medianTotalHouseholdIncome)}</div>
    </div>
  )
}

export default RegionSidebar
