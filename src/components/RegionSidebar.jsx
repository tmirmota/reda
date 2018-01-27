import React from 'react'

import { toCAD } from '../utils/formatUtils'
import { typeFormLink } from '../constants/MapConstants'

// Material UI
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'

const styles = {
  minWidth: '100%',
  marginTop: '10px',
}

const RegionSidebar = ({
  rent,
  property,
  mapFeatures,
  changeMetric,
  fetchRents,
}) => {
  const { neighborhood, city } = property
  const { bedrooms, redoSearch } = mapFeatures
  return (
    <div className="top-left p-4 m-4 shadow rounded sidebar-region d-flex flex-column">
      {rent.average_price ? (
        <div>
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
      ) : (
        <div className="my-auto">
          <h3>Uptown</h3>
          <p className="mt-3">
            We're interested in{' '}
            <a href={typeFormLink} target="_blank">
              what you think.
            </a>
          </p>
        </div>
      )}
      <div className="mt-auto">
        <div className="my-2">
          <i className="fa fa-bed pr-2" aria-hidden="true" />Bedrooms
        </div>
        {bedrooms.map((bedroom, index) => (
          <Button
            key={index}
            fab
            mini
            onClick={() => changeMetric("bedrooms", bedroom)}
            dense
            color={bedroom.value ? 'primary' : 'default'}
            raised
          >
            {bedroom.num}
            {bedrooms.length - 1 === index ? '+' : ''}
          </Button>
        ))}
      </div>
      <div className="text-center mt-auto">
        {redoSearch && <Button onClick={fetchRents}>Focus View</Button>}
      </div>
    </div>
  )
}

export default RegionSidebar
