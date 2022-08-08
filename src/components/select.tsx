import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
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

const Select = (props: ISelect) => {
  const {
    field,
    form,
    value,
    className,
    options,
    onChange,
    optionBinding,
    ...restProps
  } = props

  const onValueChange = (value: any) => {
    if (onChange) onChange(value || null)

    if (field && form) form.setFieldValue(field.name, value || null)
  }

  const renderOption = (option: any) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={option} value={option}>{option}</Option>
    }

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

  return (
    <StyledSelect
      {...restProps}
      {...(field && { id: `formik-field-${field.name}` })}
      value={field?.value ?? value}
      onChange={onValueChange}
      className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, 'select', className)}
    >
      {options.map(renderOption)}
    </StyledSelect>
  )
}
Select.defaultProps = {
  options: []
}

export default Select
