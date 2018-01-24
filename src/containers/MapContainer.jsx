import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import {
  storeMapnPopup,
  updateCoordinates,
  addHeatMapLayer,
  showRedoSearch,
  clearState,
} from '../actions/MapActions'
import { fetchRents } from '../actions/RentActions'
import { hoverProperty } from '../actions/PropertyActions'
import { hoverPolygon } from '../actions/PolygonActions'

const MapComponent = props => <Map {...props} />

const mapStateToProps = ({ mapFeatures }) => ({ mapFeatures })

export default connect(mapStateToProps, {
  storeMapnPopup,
  updateCoordinates,
  hoverProperty,
  hoverPolygon,
  addHeatMapLayer,
  fetchRents,
  showRedoSearch,
  clearState,
})(MapComponent)
