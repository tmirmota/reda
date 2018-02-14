import React, { Component } from 'react'
import Select from 'react-select'

class InputSelection extends Component {
  state = {
    value: '',
  }
  render() {
    const { options } = this.props
    const { value } = this.state
    return (
      <Select
        value={value}
        options={options}
        onChange={() => this.setState({ value })}
      />
    )
  }
}

export default InputSelection
