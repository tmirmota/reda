import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'

const SidebarComponent = props => <Sidebar {...props} />

const mapStateToProps = ({ property, selectedProperty, polygon, filters }) => ({
  property,
  selectedProperty,
  polygon,
  filters,
})

export default connect(mapStateToProps)(SidebarComponent)
