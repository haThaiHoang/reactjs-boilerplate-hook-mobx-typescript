import React, { createContext } from 'react'
import { connectReduxDevtools } from 'mst-middlewares'
import { BrowserRouter } from 'react-router-dom'
import { Instance } from 'mobx-state-tree'

import Configs from '@/configs'
import ui from './ui'
import assets from './assets'
import auth from './auth'
import products from './products'

const stores = {
  ui,
  assets,
  auth,
  products
}

export type TRootStore = Instance<typeof stores>

export const RootStoreContext = createContext<TRootStore>({} as TRootStore)
const StoreProvider = RootStoreContext.Provider

if (Configs.ENV === 'local') {
  connectReduxDevtools(require("remotedev"), auth)
}

const MainStore = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider value={stores}>
    <BrowserRouter basename={Configs.BASE_NAME}>
      {children}
    </BrowserRouter>
  </StoreProvider>
)

export default MainStore
