import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'

const NavComponent = props => <Nav {...props} />

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(NavComponent)