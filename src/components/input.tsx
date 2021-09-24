import { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input as AntInput, InputProps } from 'antd'
import lodash from 'lodash'
import { FieldInputProps, FormikProps } from 'formik'

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

interface IInputProps extends Omit<InputProps, 'form' | 'onChange'> {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (value: string) => void
}

class Input extends Component<IInputProps> {
  _parseValue = (value: string): string => {
    const { maxLength } = this.props

    if (maxLength) {
      value = value.slice(0, maxLength)
    }

    return value
  }

  _onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { field, form, onChange } = this.props
    let { value } = e.target

    value = this._parseValue(value)

    if (onChange) onChange(value)

    if (field && form) form.setFieldValue(field.name, value)
  }

  render(): JSX.Element {
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

export type { IInputProps }
export default Input
