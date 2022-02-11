import { Component } from 'react'
import { connect, FormikProps } from 'formik'

interface IProps {
  formik: FormikProps<never>
}

class ErrorFocus extends Component<IProps> {
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
