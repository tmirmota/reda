import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import {
  initMap,
  showRedoSearch,
  geoCodeResult,
  clearState,
} from '../actions/MapActions'
import { hoverProperty } from '../actions/PropertyActions'
import { hoverPolygon } from '../actions/PolygonActions'

const MapComponent = props => <Map {...props} />

const mapStateToProps = ({ mapFeatures, rent, property, legend }) => ({
  mapFeatures,
  rent,
  property,
  legend,
})

export default connect(mapStateToProps, {
  initMap,
  geoCodeResult,
  hoverProperty,
  hoverPolygon,
  showRedoSearch,
  clearState,
})(MapComponent)
