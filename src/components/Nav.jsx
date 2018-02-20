import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Menu } from 'antd'

const styles = {
  logo: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 18
  }
}

export default () => {
  return (
    <Layout.Header>
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
    </Layout.Header>
  )
}