import React from 'react'
import { connect } from 'react-redux'
import Root from '../components/Root'

const RootComponent = props => <Root {...props} />

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, {})(RootComponent)
