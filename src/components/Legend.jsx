import React from 'react'
import Bedrooms from '../components/Bedrooms'
import { toCAD } from '../utils/formatUtils'

const Legend = ({ mapFeatures, legend, changeMetric }) => {
  const { minValue, maxValue, beginColor, endColor } = legend
  const { bedrooms } = mapFeatures

  const styles = {
    background: `linear-gradient(to right, ${beginColor}, ${endColor})`,
  }

  if (maxValue <= 0) return false
    
  return (
    <div className="legend shadow bg-white rounded">
      <h6>Average Rent Range</h6>
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
