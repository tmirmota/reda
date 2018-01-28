import React, { Component } from 'react'

// Material UI
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

const styles = {
  flex: {
    flex: 1,
  },
}

class Header extends Component {
  render() {
    return (
      <header>
        <AppBar>
          <Toolbar>
            <div className="lead" style={styles.flex}>Uptown</div>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

export default Header
