import { useContext } from 'react'
import lodash from 'lodash'

import { RootStoreContext } from '@/store'
import type { TRootStore } from '@/store'

type TMapStore<T> = (store: TRootStore) => T

export const useStore = () => {
  const store = useContext(RootStoreContext)

  if (lodash.isEmpty(store)) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store
}

export const useInject = <T>(mapStore: TMapStore<T>) => {
  const store = useStore()

  return mapStore(store)
}
