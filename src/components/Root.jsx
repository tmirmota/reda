import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Row, Col, Button, Menu, Tabs } from 'antd'
import MapContainer from '../containers/MapContainer'

const { Header, Content } = Layout
const { TabPane } = Tabs

class Root extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="map">
                <Link to="/map">
                  Map
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div>
              <Row>
                <Col span={8}>
                  <Tabs>
                    <TabPane tab="Charts" key="charts">
                      Charts
                    </TabPane>
                    <TabPane tab="Filters" key="filters">
                      Filters
                    </TabPane>
                  </Tabs>
                </Col>
                <Col span={16}>
                  <Route path="/map" component={MapContainer} />
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
