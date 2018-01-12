import React from 'react'

import { toCAD } from '../utils/formatUtils'

// Material UI
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'

const styles = {
  minWidth: '100%',
  marginTop: '10px'
}

const RegionSidebar = ({ rent, property, mapFeatures, changeMetric }) => {
  const { neighborhood, city } = property
  const { bedrooms } = mapFeatures
  return (
    <div className="top-left p-4 m-4 shadow rounded sidebar-region d-flex flex-column">
      {rent.price ? (
        <div>
          <h4>
            {neighborhood}
            {neighborhood && city && ', '}
          </h4>
          <div className="lead">
            <span>Average Rent</span>
            <span className="float-right">{toCAD(rent.price)}</span>
          </div>

          {rent.count && (
            <div className="text-muted">
              <span># of Rentals</span>
              <span className="float-right">{rent.count}</span>
            </div>
          )}

          {rent.sqft > 0 && (
            <div className="lead mt-2">
              <span>Average Size</span>
              <span className="float-right">
                {rent.sqft} ft<sup>2</sup>
              </span>
            </div>
          )}

          <hr />
        </div>
      ) : (
        <div className="text-center my-auto">
        </div>
      )}
      <div className="text-center mt-auto">
        <div>Bedrooms</div>
        <Button
          onClick={() => changeMetric(1)}
          dense
          color={bedrooms === 1 ? 'primary' : 'default'}
          raised
        >
          1
        </Button>
        <Button
          onClick={() => changeMetric(2)}
          dense
          color={bedrooms === 2 ? 'primary' : 'default'}
          raised
          className="mx-2"
        >
          2
        </Button>
        <Button
          onClick={() => changeMetric(3)}
          dense
          color={bedrooms === 3 ? 'primary' : 'default'}
          raised
        >
          3 +
        </Button>
      </div>
    </div>
  )
}

export default RegionSidebar
