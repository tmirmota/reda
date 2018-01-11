import React from 'react'

import { toCAD } from '../utils/formatUtils'

const Legend = ({ mapFeatures, legend }) => {
  if (!legend.minValue || mapFeatures.zoom > 14) {
    return false
  }
  const { minValue, maxValue, beginColor, endColor } = legend
  const { bedrooms } = mapFeatures
  const styles = {
    background: `linear-gradient(to right, ${beginColor}, ${endColor})`,
  }
  
  return (
    <div className="width-small bottom-right shadow mr-3 mb-4 p-3 bg-white rounded">
      <div className="text-muted">
        {bedrooms} Bed Avg Rent Range
      </div>
      <div style={styles} className="height-small rounded" />
      <div>
        {toCAD(minValue)}
        <span className="float-right">{toCAD(maxValue)}</span>
      </div>
    </div>
  )
}

export default Legend
