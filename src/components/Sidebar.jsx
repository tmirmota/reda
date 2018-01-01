import React from 'react'

import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'

const Sidebar = ({
  filters,
  property,
  selectedProperty,
  toggleZoning = null,
  toggleSatellite = null,
  toggleSchools = null,
  toggleFire = null,
  toggleTransit = null,
}) => {
  const { zoning, satellite, schools, fireHydrants, transit } = filters
  const {
    number,
    street,
    neighborhood,
    city,
    yearBuilt,
    propertyTax,
    assessmentYear,
    totalAssessment,
    landAssessment,
    buildingAssessment,
    prevLandAssessment,
    bigImprovYear,
    zone,
    zoneUrl,
    zoneCategory,
    legalType
  } = property
  const toCAD = number => {
    if (number) {
      const currency = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return `$${currency}`
    } else {
      return null
    }
  }
  return (
    <div className={`col pt-4 sidebar ${!toggleZoning && 'sidebar-side'}`}>
      <div className="lead">
        {number} {street}
      </div>
      <div className="text-muted">
        {neighborhood}
        {neighborhood && city && ', '}
        {city}
      </div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Property Details</strong>
      </div>
      <div>
        <span>Year Built</span>
        <span className="float-right">{yearBuilt}</span>
      </div>
      <div>
        <span>Property Taxes </span>
        <span className="float-right">{toCAD(propertyTax)}</span>
      </div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Assessment</strong>
        <span className="float-right text-muted">
          <em>{assessmentYear}</em>
        </span>
      </div>
      <div className="mb-1">
        <strong>
          <span>Total Value</span>
          <span className="float-right">{toCAD(totalAssessment)}</span>
        </strong>
      </div>
      <div>
        <span>Land</span>
        <span className="float-right">{toCAD(landAssessment)}</span>
      </div>
      <div className="mb-1">
        <span>Building</span>
        <span className="float-right">{toCAD(buildingAssessment)}</span>
      </div>
      <div>
        <span className="text-muted">Prev. Land</span>
        <span className="float-right text-muted">
          {toCAD(prevLandAssessment)}
        </span>
      </div>
      <div>
        <span className="text-muted">Big Improvement Year</span>
        <span className="float-right text-muted">{bigImprovYear}</span>
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
      <div>
        <span>Legal Type: </span>
        <span>{legalType}</span>
      </div>
      <hr />
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
              control={
                <Switch checked={satellite} onChange={toggleSatellite} />
              }
              label="Satellite"
            />
          </div>
      )}
    </div>
  )
}

export default Sidebar
