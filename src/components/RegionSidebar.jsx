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

const RegionSidebar = ({ property, polygon, mapFeatures, changeHeatMap }) => {
  const { neighborhood, city } = property
  const { medianTotalHouseholdIncome } = polygon
  const { metricName, metricType } = mapFeatures
  return (
    <div>
      <h3>
        {neighborhood}
        {neighborhood && city && ', '}
      </h3>
      <div className="text-muted">{city}</div>
      <hr />
      <h4 className="sidebar-heading text-uppercase">Rental Data</h4>
      <div>
        <span>Average Rent</span>
        <span className="float-right">
          {toCAD(polygon['AVERAGE_RENT'][metricType])}
        </span>
      </div>
      <div>
        <span>Median Rent</span>
        <span className="float-right">
          {toCAD(polygon['MEDIAN_RENT'][metricType])}
        </span>
      </div>
      <div>
        <span>Vacancy Rate</span>
        <span className="float-right">
          {toCAD(polygon['VACANCY_RATE'][metricType])}
        </span>
      </div>
      <div className="text-muted mt-2">
        Source:{' '}
        <a href="https://www.cmhc-schl.gc.ca/" target="_blank">
          CMHC
        </a>
      </div>
      <hr />
      <div className="sidebar-heading text-uppercase">
        <strong>Rental Data</strong>
      </div>
      <div>
        <span>Median Household Income</span>
      </div>
      <div>{toCAD(medianTotalHouseholdIncome)}</div>
      <div className="text-muted mt-2">
        Source:{' '}
        <a href="http://statcan.gc.ca/" target="_blank">
          Stats Canada
        </a>
      </div>
      <hr />
      <FormControl style={styles}>
        <Select value={metricType} name="metricType" onChange={changeHeatMap}>
          <MenuItem value="BEDROOM_1">1 Bedroom</MenuItem>
          <MenuItem value="BEDROOM_2">2 Bedrooms</MenuItem>
          <MenuItem value="BEDROOM_3_PLUS">3+ Bedrooms</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={styles}>
        <Select value={metricName} name="metricName" onChange={changeHeatMap}>
          <MenuItem value="AVERAGE_RENT">Average Rent</MenuItem>
          <MenuItem value="MEDIAN_RENT">Median Rent</MenuItem>
          <MenuItem value="VACANCY_RATE">Vacancy Rate</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default RegionSidebar
