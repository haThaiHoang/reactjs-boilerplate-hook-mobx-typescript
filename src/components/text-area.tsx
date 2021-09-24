import { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Input } from 'antd'
import lodash from 'lodash'
import { FieldInputProps, FormikProps } from 'formik'

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

interface IProps {
  field?: FieldInputProps<string>,
  form?: FormikProps<never>,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  className?: string
}

class TextArea extends Component<IProps> {
  _onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(e)

    if (field && form) form.setFieldValue(field.name, e.target.value)
  }

  render(): JSX.Element {
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
