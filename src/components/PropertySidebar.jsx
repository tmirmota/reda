import React from 'react'

import { toCAD } from '../utils/formatUtils'
import { typeFormLink } from '../constants/MapConstants'

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
      <div className="sidebar-heading text-uppercase">Property Details</div>
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
        Assessment
        <span className="float-right text-muted">
          <em>{assessmentYear}</em>
        </span>
      </div>
      <div className="mb-1">
        <span>Total Value</span>
        <span className="float-right">{toCAD(totalAssessment)}</span>
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
      <div className="sidebar-heading text-uppercase">Zoning</div>
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
      <div>
      <p className="mt-3">We're interested in<br/><a href={typeFormLink} target="_blank">what you think.</a></p>
        </div>
    </div>
  )
}

export default PropertySidebar
