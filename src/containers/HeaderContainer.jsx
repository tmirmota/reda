import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'

const HeaderComponent = props => <Header {...props} />

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(HeaderComponent)