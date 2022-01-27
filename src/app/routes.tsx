import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Request from '@/utils/request'
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

const LoginRequire = ({ redirect, children }: { redirect: string, children: any }) => {
  if (Request.hasAccessToken()) return children
  return <Navigate to={redirect} />
}

const DashboardLayout = () => (
  <>
    <Header />
    <HorizontalBox>
      <SideBar />
      <Suspense fallback={<Page><Loading /></Page>}>
        <Outlet />
      </Suspense>
    </HorizontalBox>
  </>
)

const RoutesComponent = () => (
  <VerticalBox>
    <Suspense fallback={<Page><Loading /></Page>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LoginRequire redirect="/login"><DashboardLayout /></LoginRequire>}>
          {/* Pages need login to access should put in here */}
          <Route index element={<Home />} />
          <Route path="/examples" element={<Examples />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </VerticalBox>
)

export default RoutesComponent
