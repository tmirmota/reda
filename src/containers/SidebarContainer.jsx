import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import {
  toggleZoning,
  toggleTransit,
  toggleFire,
  toggleSchools,
} from '../actions/FilterActions'
import { changeMetric } from '../actions/MapActions'
import { fetchRents } from '../actions/RentActions'

const SidebarComponent = props => <Sidebar {...props} />

const mapStateToProps = ({
  property,
  selectedProperty,
  rent,
  filters,
  legend,
  mapFeatures,
}) => ({
  property,
  selectedProperty,
  legend,
  rent,
  filters,
  mapFeatures,
})

export default connect(mapStateToProps, {
  toggleZoning,
  toggleTransit,
  toggleFire,
  toggleSchools,
  changeMetric,
  fetchRents,
})(SidebarComponent)
