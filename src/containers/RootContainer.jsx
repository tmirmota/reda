import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'
import { fetchRents } from '../actions/RentActions'

const RootComponent = props => <Root {...props} />

const mapStateToProps = ({ mapFeatures }) => ({
  mapFeatures,
})

export default connect(mapStateToProps, { fetchRents })(RootComponent)
