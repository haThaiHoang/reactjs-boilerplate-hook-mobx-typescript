import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Checkbox as AntdCheckbox } from 'antd'
import classnames from 'classnames'

const StyledCheckbox = styled(AntdCheckbox)`
  // Put your custom styles for checkbox here
  
  span {
    &:last-child {
      user-select: none;
    }
  }
`

class Checkbox extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (field && form) form.setFieldValue(field.name, e.target.checked)
    if (onChange) onChange(e)
  }

  render() {
    const { field, form, checked, className, ...props } = this.props

    return (
      <StyledCheckbox
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        className={classnames(className, 'check-box')}
        checked={field?.value || checked}
        onChange={this._onChange}
      />
    )
  }
}

export default Checkbox
