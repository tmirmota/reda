import React from 'react'
import Bedrooms from '../components/Bedrooms'
import { toCAD } from '../utils/formatUtils'
import InputSelection from '../components/InputSelection'

const Legend = ({ mapFeatures, legend, changeMetric, rent, properties }) => {
  const { minValue, maxValue, beginColor, endColor } = legend
  const { bedrooms } = mapFeatures

  const styles = {
    background: `linear-gradient(to right, ${beginColor}, ${endColor})`,
  }

  if (maxValue <= 0) return false
    
  return (
    <div className="legend shadow bg-white rounded">
      <InputSelection options={
        properties.map(property => {
          const value = property['TO_CIVIC_NUMBER']
          return ({
            value,
            label: value
          })
        })
      } />
      <h6>{rent.name} Range</h6>
      <div style={styles} className="height-small rounded mb-1" />
      <div className="d-flex justify-content-between mb-2">
        <div>{toCAD(minValue)}</div>
        <div>{toCAD(maxValue)}</div>
      </div>
      <Bedrooms bedrooms={bedrooms} changeMetric={changeMetric} />
    </div>
  )
}

export default Legend
