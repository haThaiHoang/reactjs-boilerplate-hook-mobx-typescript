import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { Radio } from 'antd'

const StyledRadioGroup = styled(Radio.Group)`
  // Put your custom styles for Radios here
  
  .ant-radio-wrapper {
    span {
      &:last-child {
        user-select: none;
      }
    }
  }
`

class Radios extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    value: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    options: []
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (form && field) form.setFieldValue(field.name, e.target.value)
    if (onChange) onChange(e)
  }

  _renderOption = (option) => (
    <Radio
      key={option.value}
      value={option.value}
    >
      {option.name}
    </Radio>
  )

  render() {
    const { field, form, value, className, options, ...props } = this.props

    return (
      <StyledRadioGroup
        {...props}
        onChange={this._onChange}
        value={field?.value ?? value}
        className={classnames('radios', className)}
      >
        {options.map(this._renderOption)}
      </StyledRadioGroup>
    )
  }
}

export default Radios
