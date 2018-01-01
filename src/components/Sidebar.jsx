import React from 'react'

import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'

const Sidebar = ({ filters, property, location, selectedProperty = false }) => {
  const { number, street, neighborhood, city } = location
  const { zoning, satellite } = filters
  const {
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
    legalType,
    pcoord
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
    <div className="col pt-4 sidebar">
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
      <strong>
        <span>Total Value</span>
        <span className="float-right">{toCAD(totalAssessment)}</span>
      </strong>
      <div>
        <span>Land</span>
        <span className="float-right">{toCAD(landAssessment)}</span>
      </div>
      <div>
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
        <span className="float-right">{legalType}</span>
      </div>
      <hr />
      <FormControlLabel
        control={<Switch checked={zoning} onChange={this.toggleZoning} />}
        label="Zoning"
      />
      <FormControlLabel
        control={<Switch checked={satellite} onChange={this.toggleSatellite} />}
        label="Satellite"
      />
      {selectedProperty && (
        <div className="text-center">
          <Button color="accent" onClick={this.removeSelection}>
            Remove Selection
          </Button>
        </div>
      )}
    </div>
  )
}

export default Sidebar

//
// class Sidebar extends Component {
//   render() {
//     const { title, }
//     return (
//       <div className="col pt-4 sidebar">
//         {lngLat && (
//           <div>
//             <div>
//               <div>
//                 {propertyAddress ? (
//                   <div className="lead">
//                     {propertyAddress.number} {propertyAddress.street}
//                   </div>
//                 ) : (
//                   ''
//                 )}
//                 <div className="text-muted">
//                   {neighborhood}
//                   {neighborhood && place && ', '}
//                   {place}
//                 </div>
//               </div>
//               <hr />
//               {propertyDetails && (
//                 <div>
//                   <div>
//                     <div className="sidebar-heading">
//                       <strong className="text-uppercase">
//                         Property Details
//                       </strong>
//                     </div>
//                     <div>
//                       <span>Year Built </span>
//                       <span className="float-right">
//                         {propertyDetails['YEAR_BUILT']}
//                       </span>
//                     </div>
//                     <div>
//                       <span>Property Taxes </span>
//                       <span className="float-right">
//                         ${propertyDetails['TAX_LEVY']
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       </span>
//                     </div>
//                   </div>
//                   <hr />
//                   <div>
//                     <div className="sidebar-heading">
//                       <strong className="text-uppercase">Assessment</strong>
//                       <span className="float-right text-muted">
//                         <em>{propertyDetails['TAX_ASSESSMENT_YEAR']}</em>
//                       </span>
//                     </div>
//                     <strong>
//                       <span>Total Value</span>
//                       <span className="float-right">
//                         ${(propertyDetails['CURRENT_LAND_VALUE'] + propertyDetails['CURRENT_IMPROVEMENT_VALUE'])
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       </span>
//                     </strong>
//                     <div>
//                       <span>Land</span>
//                       <span className="float-right">
//                         ${propertyDetails['CURRENT_LAND_VALUE']
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       </span>
//                     </div>
//                     <div>
//                       <span>Building</span>
//                       <span className="float-right">
//                         ${propertyDetails['CURRENT_IMPROVEMENT_VALUE']
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-muted">Prev. Land Value </span>
//                       <span className="float-right text-muted">
//                         ${propertyDetails['PREVIOUS_LAND_VALUE']
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-muted">
//                         Big Improvement Year
//                       </span>
//                       <span className="float-right text-muted">
//                         {propertyDetails['BIG_IMPROVEMENT_YEAR']}
//                       </span>
//                     </div>
//                   </div>
//                   <hr />
//                   <div>
//                     <div>
//                       <div className="sidebar-heading">
//                         <strong className="text-uppercase">Zoning</strong>
//                         <span className="float-right">
//                           <Switch
//                             checked={showZoning}
//                             onChange={this.toggleZoning('showZoning')}
//                             classes={{ default: classes.switch }}
//                           />
//                         </span>
//                       </div>
//                     </div>
//                     <div>
//                       {zone ? (
//                         <a href={zone.url} target="_blank">
//                           {zone.name}
//                         </a>
//                       ) : (
//                         ''
//                       )}
//                     </div>
//                     <div>{propertyDetails['ZONE_CATEGORY']}</div>
//                     <div>
//                       <span>Legal Type: </span>
//                       <span className="text-capitalize">
//                         {propertyDetails['LEGAL_TYPE']}
//                       </span>
//                     </div>
//                   </div>
//                   <hr />
//                 </div>
//               )}
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={satellite}
//                     onChange={this.toggleSatellite}
//                   />
//                 }
//                 label="Satellite"
//               />
//               {selectedProperty && (
//                 <div className="text-center">
//                   <Button color="accent" onClick={this.removeSelection}>
//                     Remove Selection
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }
// }
//
// export default Sidebar
