import React from 'react'
import Button from 'material-ui/Button'

const FocusView = ({ active, onClick, label }) => {
  if (!active) return false
  return (
    <div className="fixed-bottom w-100 text-center mb-3">
      <Button raised color="primary" onClick={onClick}>
        {label}
      </Button>
    </div>
  )
}

export default FocusView
