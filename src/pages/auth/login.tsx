import { useState } from 'react'
import { Formik, Form, FormikProps, FormikValues } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
import Container from '@/components/container'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'
import VALIDATION_MESSAGES from '@/constants/validation-messages'
import { useStore } from '@/store'

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .form {
    padding: 40px;
    box-shadow: 0 12px 201px 0 rgba(0, 0, 0, 0.06);
    width: 440px;
    border-radius: 4px;
    background-color: white;

    .logo {
      max-width: 300px;
      transform: translateX(-50%);
      margin: 0 auto 30px 50%;
    }

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }

    .field-group {
      > * {
        margin-bottom: 9px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
`

const validationSchema = yup.object().shape({
  username: yup.string().required(VALIDATION_MESSAGES.USERNAME_REQUIRED),
  password: yup.string().required(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
})

const initialValues = {
  username: '',
  password: ''
}

const Login = (): JSX.Element => {
  const store = useStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: FormikValues): Promise<void> => {
    setLoading(true)

    const { success, data } = await store.auth.login(values)

    if (success) {
      Storage.set('ACCESS_TOKEN', data.token)
      Request.setAccessToken(data.token)

      setLoading(false)
      navigate('/')
    } else {
      setLoading(false)
    }
  }

  const renderForm = ({ handleSubmit }: FormikProps<FormikValues>): JSX.Element => {
    return (
      <Form className="form">
        <p className="title">LOGIN</p>
        <div className="field-group">
          <Field
            name="username"
            label="Username (admin)"
            component={Input}
          />
          <Field
            name="password"
            label="Password (123123123)"
            type="password"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            size="large"
            type="submit"
            loading={loading}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Form>
    )
  }

  return (
    <Page>
      <StyledContainer>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          component={renderForm}
        />
      </StyledContainer>
    </Page>
  )
}

export default Login
