import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input as AntInput } from 'antd'
import lodash from 'lodash'

const StyledInput = styled(AntInput)`
  // Custom placeholder color

  //::placeholder {
  //  color: #b0b4b5;
  //  opacity: 1;
  //}
  //
  //:-ms-input-placeholder {
  //  color: #b0b4b5;
  //}
  //
  //::-ms-input-placeholder {
  //  color: #b0b4b5;
  //}
  
  &.error {
    border: solid 1px red;
  }
  
  // Disable autofill background
  //&:-webkit-autofill,
  //&:-webkit-autofill:hover, 
  //&:-webkit-autofill:focus, 
  //&:-webkit-autofill:active  {
  //    -webkit-box-shadow: 0 0 0 30px white inset !important;
  //}
`

class Input extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  _onChange = (e) => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(e)

    if (field && form) form.setFieldValue(field.name, e.target.value)
  }

  render() {
    const { field, form, value, className, ...props } = this.props

    return (
      <StyledInput
        {...field}
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value || value}
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className, 'input')}
        onChange={this._onChange}
      />
    )
  }
}

export default Input
