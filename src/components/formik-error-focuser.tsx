import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, FormikProps } from 'formik'

interface IProps {
  formik: FormikProps<never>
}

class ErrorFocus extends Component<IProps> {
  static propTypes = {
    formik: PropTypes.object
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.formik.isSubmitting && !this.props.formik.isSubmitting && !this.props.formik.isValid) {
      const { errors } = prevProps.formik
      const keys = Object.keys(errors)

      const id = `formik-field-${keys[0]}`
      const errorElement = document.getElementById(id)

      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }

  render() {
    return null
  }
}

export default connect(ErrorFocus as any)
