import React from 'react'

import { toCAD } from '../utils/formatUtils'

// Material UI
import { FormControl } from 'material-ui/Form'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

const styles = {
  minWidth: '100%',
  marginTop: '10px',
}

const RegionSidebar = ({ property, mapFeatures, changeHeatMap }) => {
  const { neighborhood, city } = property
  const { metricName, metricType } = mapFeatures
  return (
    <div>
      <h3>
        {neighborhood}
        {neighborhood && city && ', '}
      </h3>
      <hr />
      <FormControl style={styles}>
        <Select value={metricType} name="metricType" onChange={changeHeatMap}>
          <MenuItem value="BEDROOM_1">1 Bedroom</MenuItem>
          <MenuItem value="BEDROOM_2">2 Bedrooms</MenuItem>
          <MenuItem value="BEDROOM_3_PLUS">3+ Bedrooms</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default RegionSidebar
