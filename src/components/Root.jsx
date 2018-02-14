import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import MapContainer from '../containers/MapContainer'

const { Header, Content } = Layout


class Root extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Header>Header</Header>
          <Content>
            <div>
            <Row>
              <Col span={8}>Hello World</Col>
              <Col span={16}>
                <MapContainer />
              </Col>
            </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Root
