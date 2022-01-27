import React, { createContext, useContext } from 'react'
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

interface IRootStore extends Instance<typeof stores> {}

const RootStoreContext = createContext<null | IRootStore>(null)
const StoreProvider = RootStoreContext.Provider

export function useStore() {
  const store = useContext(RootStoreContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store
}

const MainStore = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider value={stores}>
    <BrowserRouter basename={Configs.BASE_NAME}>
      {children}
    </BrowserRouter>
  </StoreProvider>
)

export default MainStore
