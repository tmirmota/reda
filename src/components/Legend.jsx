import React from 'react'

import { toCAD } from '../utils/formatUtils'

const Legend = ({ mapFeatures, legend }) => {
  if (!legend) {
    return false
  }
  const { minValue, maxValue, beginColor, endColor } = legend
  const { metricName } = mapFeatures
  const styles = {
    background: `linear-gradient(to right, ${beginColor}, ${endColor})`,
  }
  return (
    <div className="width-small bottom-right shadow mr-3 mb-4 p-3 bg-white rounded">
      <div className="text-muted">{metricName.replace('_', ' ')} RANGE</div>
      <div style={styles} className="height-small rounded" />
      <div>
        {toCAD(minValue)}
        <span className="float-right">{toCAD(maxValue)}</span>
      </div>
    </div>
  )
}

export default Legend
