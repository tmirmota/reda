import React from 'react'
import Button from 'material-ui/Button'

const Bedrooms = ({ bedrooms, changeMetric }) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <div className="lead mr-4">Bedrooms</div>
      {bedrooms.map((bedroom, index) => (
        <Button
          key={index}
          fab
          mini
          onClick={() => changeMetric('bedrooms', bedroom)}
          dense
          color={bedroom.value ? 'primary' : 'default'}
          raised
          className="mr-2"
        >
          {bedroom.num}
          {bedrooms.length - 1 === index ? '+' : ''}
        </Button>
      ))}
    </div>
  )
}

export default Bedrooms
