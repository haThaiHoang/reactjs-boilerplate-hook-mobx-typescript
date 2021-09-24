import { types, Instance } from 'mobx-state-tree'

import { Model } from '@/utils/mobx-model-helper'
import { login } from '@/api/auth'

const TYPES = {
  LOGIN: 'LOGIN'
}

const AuthStore = Model.named('AuthStore')
  .props({
    loggedIn: types.boolean,
    lele: types.boolean
  })
  .actions((self) => ({
    setLogin() {
      self.loggedIn = !self.loggedIn
    },
    login(payload: any) {
      return self.request({
        type: TYPES.LOGIN,
        api: login,
        payload,
        onSuccess: () => {
          self.loggedIn = true
        }
      })
    }
  }))
  .create({
    loggedIn: false,
    lele: false
  })

interface IAuthStore extends Instance<typeof AuthStore> {}

export { TYPES }
export type { IAuthStore }
export default AuthStore as IAuthStore
