import { Component } from 'react'
import styled from 'styled-components'
import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd'
import classnames from 'classnames'
import { FieldInputProps, FormikProps } from 'formik'

const StyledCheckbox = styled(AntdCheckbox)`
  // Put your custom styles for checkbox here
  
  span {
    &:last-child {
      user-select: none;
    }
  }
`

interface ICheckboxProps extends Omit<CheckboxProps, 'form' | 'onChange'> {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (value: string) => void
  checked?: boolean
}

class Checkbox extends Component<ICheckboxProps> {
  _onChange = (e: any): void => {
    const { field, form, onChange } = this.props

    if (field && form) form.setFieldValue(field.name, e.target.checked)
    if (onChange) onChange(e)
  }

  render(): JSX.Element {
    const { field, form, checked, className, ...props } = this.props

    return (
      <StyledCheckbox
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        className={classnames(className, 'check-box')}
        checked={!!field?.value || checked}
        onChange={this._onChange}
      />
    )
  }
}

export default Checkbox
