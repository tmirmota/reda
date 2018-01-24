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
  marginTop: '10px'
}

const RegionSidebar = ({
  rent,
  property,
  mapFeatures,
  changeMetric,
  addHeatMapLayer
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
      {/* <div className="mt-auto">
        <div className="my-2">
          <i className="fa fa-bed pr-2" aria-hidden="true" />Bedrooms
        </div>
        <Button
          fab
          mini
          onClick={() => changeMetric(1)}
          dense
          color={bedrooms === 1 ? 'primary' : 'default'}
          raised
        >
          1
        </Button>
        <Button
          fab
          mini
          onClick={() => changeMetric(2)}
          dense
          color={bedrooms === 2 ? 'primary' : 'default'}
          raised
          className="mx-2"
        >
          2
        </Button>
        <Button
          fab
          mini
          onClick={() => changeMetric(3)}
          dense
          color={bedrooms === 3 ? 'primary' : 'default'}
          raised
        >
          3+
        </Button>
      </div> */}
      <div className="text-center mt-auto">
        {redoSearch && <Button onClick={addHeatMapLayer}>Focus View</Button>}
      </div>
    </div>
  )
}

export default RegionSidebar
