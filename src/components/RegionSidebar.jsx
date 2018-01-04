import React from 'react'
import Button from 'material-ui/Button'

import { toCAD } from '../utils/formatUtils'

const RegionSidebar = ({ property, polygon, heatmap }) => {
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
      <div>
        <span>Median Rent</span>
        <span className="float-right">{toCAD(medianRent.total)}</span>
      </div>
      <div>
        <span>Vacancy Rate</span>
        <span className="float-right">{vacancyStr}</span>
      </div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Population Details</strong>
      </div>
      <div>
        <span>Household Income</span>
        <span className="float-right">{toCAD(medianTotalHouseholdIncome)}</span>
      </div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Zoning</strong>
      </div>
      <div>
        <a href={zoneUrl} target="_blank">
          {zone}
        </a>
      </div>
      <div>{zoneCategory}</div>
      <hr />
      <Button onClick={heatmap}>Heat Map</Button>
    </div>
  )
}

export default RegionSidebar
