import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { observer } from 'mobx-react'
import { Select as AntdSelect } from 'antd'

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

@observer
class Select extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    optionBinding: PropTypes.object,
    value: PropTypes.any,
    size: PropTypes.oneOf(['small', 'middle']),
    onChange: PropTypes.func,
    error: PropTypes.bool
  }

  static defaultProps = {
    options: []
  }

  _onChange = (value) => {
    const { field, form, onChange } = this.props

    if (onChange) onChange(value || null)

    if (field && form) form.setFieldValue(field.name, value || null)
  }

  _renderOption = (option) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={option} value={option}>{option}</Option>
    }

    const { optionBinding } = this.props

    let value
    let name
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
      error,
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
        value={field?.value || value}
        onChange={this._onChange}
        className={classnames({
          error: lodash.get(form, `errors.${field?.name}`) || error
        }, 'select', className)}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}

export default Select
