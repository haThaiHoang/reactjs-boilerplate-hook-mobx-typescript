import { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Radio, RadioChangeEvent } from 'antd'
import { FieldInputProps, FormikProps } from 'formik'

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

type TOption = {
  name: string
  value: any
}

interface TRadios {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (e: RadioChangeEvent) => void
  name: string
  value: any
  options: TOption[]
  className?: string
}

class Radios extends Component<TRadios> {
  static defaultProps = {
    options: []
  }

  _onChange = (e: RadioChangeEvent) => {
    const { field, form, onChange } = this.props

    if (form && field) form.setFieldValue(field.name, e.target.value)
    if (onChange) onChange(e)
  }

  _renderOption = (option: TOption) => (
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
