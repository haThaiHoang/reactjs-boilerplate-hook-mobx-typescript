import { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { DatePicker as AntDatePicker } from 'antd'
import moment from 'moment'
import lodash from 'lodash'
import { FieldInputProps, FormikProps } from 'formik'

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

interface IDatePickerProps {
  field?: FieldInputProps<string>
  form?: FormikProps<never>
  onChange?: (value: moment.Moment | string) => void
  inputOutputFormat?: string
  value?: moment.Moment | string
  className?: string
}

class DatePicker extends Component<IDatePickerProps> {
  _onChange = (date: moment.Moment | null) => {
    const { field, form, onChange, inputOutputFormat } = this.props

    const parseDate = inputOutputFormat ? date?.format(inputOutputFormat) : date

    if (form && field) form.setFieldValue(field.name, parseDate || null)
    if (onChange) onChange(parseDate as any)
  }

  render() {
    const { field, form, className, inputOutputFormat, ...props } = this.props
    let { value } = this.props

    value = field?.value || value
    const momentValue = value && moment(value, inputOutputFormat)

    return (
      <StyledDiv
        className={classnames({ error: lodash.get(form, `errors.${field?.name}`) }, className)}
        {...(field && { id: `formik-field-${field.name}` })}
      >
        <AntDatePicker
          {...props}
          onChange={this._onChange}
          value={momentValue as any}
        />
      </StyledDiv>
    )
  }
}

export default DatePicker
