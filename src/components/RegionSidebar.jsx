import React from 'react'

import { toCAD } from '../utils/formatUtils'

// Material UI
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

const styles = {
  minWidth: '100%',
  marginTop: '10px',
}

const RegionSidebar = ({ rent, property, mapFeatures, changeHeatMap }) => {
  const { neighborhood, city } = property
  const { metricType } = mapFeatures
  return (
    <div>
      <h3>
        {neighborhood}
        {neighborhood && city && ', '}
      </h3>
      <hr />
      <div>
        <span>Average Rent</span>
        <span className="float-right">{toCAD(rent.price)}</span>
      </div>
      <div>
        <span>Count</span>
        <span className="float-right">{rent.count}</span>
      </div>
      <hr />
      <FormControl style={styles}>
        <Select value={metricType} name="metricType" onChange={changeHeatMap}>
          <MenuItem value="BEDROOM_1">1 Bedroom</MenuItem>
          <MenuItem value="BEDROOM_2">2 Bedrooms</MenuItem>
          <MenuItem value="BEDROOM_3">3+ Bedrooms</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default RegionSidebar
