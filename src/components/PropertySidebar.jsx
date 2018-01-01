import React from 'react'

import { toCAD } from '../utils/formatUtils'

const PropertySidebar = ({ property }) => {
  const {
    pid,
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
  return (
    <div>
      <div className="lead">
        {number} {street}
      </div>
      <div className="text-muted">
        {neighborhood}
        {neighborhood && city && ', '}
        {city}
      </div>
      <div className="text-muted">
        {pid && 'PID: '}
        {pid}
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
    </div>
  )
}

export default PropertySidebar
