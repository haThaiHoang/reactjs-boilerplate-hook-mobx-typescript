import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input } from 'antd'
import lodash from 'lodash'

const { TextArea: AntTextArea } = Input

const StyledTextArea = styled(AntTextArea)`
  // Custom placeholder
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
  
  // Disable auto fill backgorund
  //&:-webkit-autofill,
  //&:-webkit-autofill:hover, 
  //&:-webkit-autofill:focus, 
  //&:-webkit-autofill:active  {
  //    -webkit-box-shadow: 0 0 0 30px white inset !important;
  //}
`

class TextArea extends Component {
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
      <StyledTextArea
        {...field}
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value || value}
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className, 'text-area')}
        onChange={this._onChange}
      />
    )
  }
}

export default TextArea
