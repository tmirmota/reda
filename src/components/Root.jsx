import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Row, Col, Menu, Tabs } from 'antd'
import MapContainer from '../containers/MapContainer'
import Chart from '../components/Chart'

const { Header, Content } = Layout
const { TabPane } = Tabs

const styles = {
  logo: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 18
  }
}

class Root extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Row type="flex" justify="space-between" align="center">
            <Col>
              <Link to="/">
                <div style={styles.logo}>
                  Uptown
                </div>
              </Link>
            </Col>
            <Col>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="faqs">
                  <Link to="/faqs">FAQS</Link>
                </Menu.Item>
                <Menu.Item key="map">
                  <Link to="/map">Map</Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>
          <div>
            <Row>
              <Col span={8}>
                <Tabs>
                  <TabPane tab="Charts" key="charts">
                    <Chart {...this.props} />
                  </TabPane>
                  <TabPane tab="Filters" key="filters">
                    Filters
                  </TabPane>
                </Tabs>
              </Col>
              <Col span={16}>
                <Route exact path="/" render={() => <h3>hello world</h3>} />
                <Route path="/map" component={MapContainer} />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Root
