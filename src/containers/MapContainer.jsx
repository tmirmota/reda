import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import {
  storeMapnPopup,
  updateCoordinates,
  addDataLayer,
} from '../actions/MapActions'
import { hoverProperty } from '../actions/PropertyActions'
import { hoverPolygon } from '../actions/PolygonActions'

const MapComponent = props => <Map {...props} />

const mapStateToProps = ({ mapFeatures }) => ({ mapFeatures })

export default connect(mapStateToProps, {
  storeMapnPopup,
  updateCoordinates,
  hoverProperty,
  hoverPolygon,
  addDataLayer,
})(MapComponent)
