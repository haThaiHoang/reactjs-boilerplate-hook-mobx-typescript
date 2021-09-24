import { Component, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Storage from '@/utils/storage'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Header from './header'
import SideBar from './side-bar'

const Login = lazy(() => import('@/pages/auth/login'))
const Home = lazy(() => import('@/pages/home'))
const Examples = lazy(() => import('@/pages/examples'))
const NotFound = lazy(() => import('@/pages/not-found'))

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HorizontalBox = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}
PrivateRoute.propTypes = {
  condition: PropTypes.func,
  redirect: PropTypes.string
}

class Routes extends Component {
  _renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

  // Add private routes that need login here
  _renderPrivateRoutes = () => (
    <>
      <Header />
      <HorizontalBox>
        <SideBar />
        <Suspense fallback={<Page sidebar><Loading /></Page>}>
          <Switch>
            <Route exact path="/" component={this._renderLazyComponent(Home)} />
            <Route exact path="/examples" component={this._renderLazyComponent(Examples)} />
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </HorizontalBox>
    </>
  )

  render() {
    return (
      <VerticalBox>
        <Suspense fallback={<Page><Loading /></Page>}>
          <Switch>
            <Route path="/login" component={this._renderLazyComponent(Login)} />
            <Route path="/not-found" component={this._renderLazyComponent(NotFound)} />
            <PrivateRoute
              condition={() => Storage.has('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this._renderPrivateRoutes}
            />
          </Switch>
        </Suspense>
      </VerticalBox>
    )
  }
}

export default Routes
