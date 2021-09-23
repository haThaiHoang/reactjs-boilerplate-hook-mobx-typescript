import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { FastField as FormikFastField, Field as FormikField, ErrorMessage } from 'formik'

import Typography from '@/components/typography'

const Box = styled.div`
  position: relative;

  .label {
    margin-bottom: 6px;
  }
`
const Group = styled.div`
  display: flex;
`

const Wraper = styled.div`
  flex: 1;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
`

const Label = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 2px;

  >.__name {
    color: #849095;
  }
  
  .__require {
    margin-left: 10px;
    margin-bottom: 3px;
    color: red;
  }
`

const Inner = styled.div`
  display: flex;
  
  > * {
    flex: 1;
    margin-right: 12px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`

const ViewOnly = styled.div`
  height: 48px;
  display: flex;
  align-items: flex-start;
  padding: 0 10px;
  padding-top: 12px;
`

const Blank = styled.div`
  flex: 1;
`

const Divider = styled.div`
  padding: 0 4px;
  flex: none;
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-left: -12px;
  color: #707070;
`

const ErrorBox = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  
  .error-message {
    color: #ff0000;
  }
`

class Field extends Component {
  static propTypes = {
    component: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    blockUnnecessaryRerender: PropTypes.bool
  }

  static defaultProps = {
    blockUnnecessaryRerender: true
  }

  static Group = Group

  static Wraper = Wraper

  static ViewOnly = ({ content, className, placeholder }) => (
    <ViewOnly className={classNames('view-only', className)}>
      {content || placeholder || 'ー'}
    </ViewOnly>
  )

  static Blank = Blank

  static Divider = () => (
    <Divider>-</Divider>
  )

  static Label = ({ children, required }) => (
    <Label>
      <Typography bold className="__name">{children}</Typography>
      {required && (
        <Typography className="__require" size="small">(required)</Typography>
      )}
    </Label>
  )

  static Inner = Inner

  static Error = ({ message }) => (
    <ErrorBox className="error-box">
      <Typography size="small" className="error-message">{message}</Typography>
    </ErrorBox>
  )

  render() {
    const {
      component: InputComponent,
      className,
      name,
      label,
      blockUnnecessaryRerender,
      ...props
    } = this.props
    const FieldComponent = blockUnnecessaryRerender ? FormikFastField : FormikField

    return (
      <Box className={classNames(className, 'field')}>
        {label && (
          <Typography
            className="label"
          >
            {label}
          </Typography>
        )}
        <div>
          <FieldComponent {...props} name={name} component={InputComponent} />
          <ErrorMessage name={name}>
            {(message) => message && (
              <Field.Error message={message} />
            )}
          </ErrorMessage>
        </div>
      </Box>
    )
  }
}

export default Field
