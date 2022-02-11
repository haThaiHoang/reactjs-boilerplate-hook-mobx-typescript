import { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { observer } from 'mobx-react'
import { Select as AntdSelect } from 'antd'
import { FieldInputProps, FormikProps } from 'formik'

const StyledSelect = styled(AntdSelect)`
  // Put your custom styles for select here
  width: 100%;
  
  &.error {
    &.ant-select-single {
      .ant-select-selector {
        border: solid 1px red;
      }
    }
  }
`

const { Option } = AntdSelect

interface ISelect {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (value: string) => void
  options: any[]
  optionBinding: {
    name: string
    value: any
  }
  size?: 'small' | 'middle'
  className?: string
  value: any
}

@observer
class Select extends Component<ISelect> {
  static defaultProps = {
    options: []
  }

  _onChange = (value: any) => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(value || null)

    if (field && form) form.setFieldValue(field.name, value || null)
  }

  _renderOption = (option: any) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={option} value={option}>{option}</Option>
    }

    const { optionBinding } = this.props

    let value: any
    let name: string
    if (lodash.isEmpty(optionBinding)) {
      value = option.value
      name = option.name
    } else {
      value = option[optionBinding.value]
      name = option[optionBinding.name]
    }

    return (
      <Option key={value} value={value}>{name}</Option>
    )
  }

  render() {
    const {
      field,
      form,
      value,
      className,
      options,
      onChange,
      optionBinding,
      ...props
    } = this.props

    return (
      <StyledSelect
        {...props}
        {...(field && { id: `formik-field-${field.name}` })}
        value={field?.value ?? value}
        onChange={this._onChange}
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, 'select', className)}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}

export default Select
