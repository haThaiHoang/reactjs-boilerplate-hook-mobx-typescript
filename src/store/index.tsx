import React, { createContext, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Instance } from 'mobx-state-tree'
import lodash from 'lodash'

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

type TRootStore = Instance<typeof stores>

const RootStoreContext = createContext<TRootStore>({} as TRootStore)
const StoreProvider = RootStoreContext.Provider

export function useStore() {
  const store = useContext(RootStoreContext)

  if (lodash.isEmpty(store)) {
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
