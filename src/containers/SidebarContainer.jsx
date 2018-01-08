import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import {
  toggleZoning,
  toggleTransit,
  toggleFire,
  toggleSchools,
} from '../actions/FilterActions'
import { changeHeatMap } from '../actions/MapActions'

const SidebarComponent = props => <Sidebar {...props} />

const mapStateToProps = ({
  property,
  selectedProperty,
  rent,
  filters,
  mapFeatures,
}) => ({
  property,
  selectedProperty,
  rent,
  filters,
  mapFeatures,
})

export default connect(mapStateToProps, {
  toggleZoning,
  toggleTransit,
  toggleFire,
  toggleSchools,
  changeHeatMap,
})(SidebarComponent)
