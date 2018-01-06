import React from 'react'
import { connect } from 'react-redux'

import Legend from '../components/Legend'

const LegendComponent = props => <Legend {...props} />

const mapStateToProps = ({ legend }) => ({ legend })

export default connect(mapStateToProps)(LegendComponent)
