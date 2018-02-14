import React, { Component } from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

class DrawerSider extends Component {
  state = {
    collapsed: true
  }
  render() {
    const { collapsed } = this.state
    return (
      <Sider
        collapsed={collapsed}
        collapsible
      >
        Hello World
      </Sider>
    )
  }
}

export default DrawerSider