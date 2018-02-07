import React from 'react'
import { connect } from 'react-redux'
import Legend from '../components/Legend'
import { changeMetric } from '../actions/MapActions'

const LegendComponent = props => <Legend {...props} />

const mapStateToProps = ({ legend, rent, mapFeatures, properties }) => ({ legend, rent, mapFeatures, properties })

export default connect(mapStateToProps, { changeMetric })(LegendComponent)
