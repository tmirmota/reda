import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { onLoadMap, updateCoordinates } from '../actions/MapActions'

const MapComponent = props => <Map {...props} />

const mapStateToProps = ({ mapFeatures }) => ({ mapFeatures })

export default connect(mapStateToProps, { onLoadMap, updateCoordinates })(
  MapComponent,
)
