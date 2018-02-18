import React from 'react'
import { BarChart, Bar, XAxis, YAxis, LabelList, Cell } from 'recharts'
import { toCAD } from '../utils/formatUtils'


export default ({rent, property, mapFeatures, legend }) => {
  const { price, count, sqft, min, max } = rent
  if (!price) return false
  const { neighborhood, city } = property
  const { bedrooms, redoSearch } = mapFeatures
  return (
    <BarChart
      width={250}
      height={200}
      data={[rent]}
      margin={{ top: 10, left: 0, bottom: 5 }}
    >
      <XAxis tick={false} label={false} />

      <YAxis
        domain={[0, legend.maxValue]}
        interval="preserveStartEnd"
        hide={true}
      />

      <Bar dataKey="min" isAnimationActive={false}>
        <LabelList dataKey="min" position="top" formatter={toCAD} />
        <LabelList dataKey="min" position="bottom" content={() => 'Low'} />
        <Cell fill="#1de9b6" />
      </Bar>

      <Bar dataKey="price"  isAnimationActive={false}>
        <LabelList dataKey="price" position="top" formatter={toCAD} />
        <LabelList
          dataKey="price"
          position="bottom"
          content={() => 'Median'}
        />
        <Cell fill="#3f51b5" />
      </Bar>
    </BarChart>
  )


}