import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import { Layout } from 'antd'
import MapContainer from '../containers/MapContainer'
import NavContainer from '../containers/NavContainer'

class Root extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavContainer />
        <Layout.Content>
          <Route exact path="/" render={() => <h3>hello world</h3>} />
          <Route path="/map" component={MapContainer} />
        </Layout.Content>
      </Layout>
    )
  }
}

export default Root
