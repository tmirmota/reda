import React, { Component } from 'react'
import { Row, Col, Tabs } from 'antd'

// Components
import Chart from './Chart'
import MapboxGL from './MapboxGL'

const { TabPane } = Tabs

export default class Map extends Component {
  render() {
    return (
      <Row type="flex">
        <Col span={8}>
          <Tabs className="center">
            <TabPane tab="Charts" key="charts">
              <Chart {...this.props} />
            </TabPane>
            <TabPane tab="Filters" key="filters">
              Filters
            </TabPane>
          </Tabs>
        </Col>
        <Col span={16}>
          <MapboxGL {...this.props} />
        </Col>
      </Row>
    )
  }
}
