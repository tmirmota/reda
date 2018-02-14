import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from '../components/Root'
import { fetchRents } from '../actions/RentActions'

const RootComponent = props => (
  <Router location={props.location}>
    <Root {...props} />
  </Router>
)

const mapStateToProps = ({ mapFeatures, location }) => ({
  mapFeatures,
  location,
})

export default connect(mapStateToProps, { fetchRents })(RootComponent)
