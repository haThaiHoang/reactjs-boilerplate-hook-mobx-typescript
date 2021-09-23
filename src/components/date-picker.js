import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { DatePicker as AntDatePicker } from 'antd'
import moment from 'moment'
import lodash from 'lodash'

const StyledDiv = styled.div`
  // Put your custom styles for Date picker here
  
  .ant-picker {
    width: 100%;
  }
  
  &.error {
    .ant-picker {
      border: solid 1px red;
    }
  }
`

class DatePicker extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    inputOutputFormat: PropTypes.string
  }

  _onChange = (date) => {
    const { field, form, onChange, inputOutputFormat } = this.props

    date = inputOutputFormat ? date?.format(inputOutputFormat) : date

    if (form && field) form.setFieldValue(field.name, date || null)
    if (onChange) onChange(date)
  }

  render() {
    const { field, form, className, inputOutputFormat, ...props } = this.props
    let { value } = this.props

    value = field?.value || value
    value = value && moment(value, inputOutputFormat)

    return (
      <StyledDiv
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className)}
        {...(field && { id: `formik-field-${field.name}` })}
      >
        <AntDatePicker
          {...props}
          onChange={this._onChange}
          value={value}
        />
      </StyledDiv>
    )
  }
}

export default DatePicker
