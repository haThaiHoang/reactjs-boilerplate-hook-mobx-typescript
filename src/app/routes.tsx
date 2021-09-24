import { Suspense, lazy } from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
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

interface IPrivateRouteProps extends RouteProps {
  condition: () => boolean
  redirect: string
}

const PrivateRoute = ({ condition, redirect, ...props }: IPrivateRouteProps) => {
  const isValid = condition()

  if (isValid) return <Route {...props} />
  return <Redirect to={redirect} />
}

const Routes = () => {
  // Put private routes that need login here
  const renderPrivateRoutes = () => (
    <>
      <Header />
      <HorizontalBox>
        <SideBar />
        <Suspense fallback={<Page sidebar><Loading /></Page>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/examples" component={Examples} />
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </HorizontalBox>
    </>
  )

  return (
    <VerticalBox>
      <Suspense fallback={<Page><Loading /></Page>}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
          <PrivateRoute
            condition={() => Storage.has('ACCESS_TOKEN')}
            redirect="/login"
            path="/"
            component={renderPrivateRoutes}
          />
        </Switch>
      </Suspense>
    </VerticalBox>
  )
}

export default Routes
