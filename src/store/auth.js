import { types } from 'mobx-state-tree'

import { Model } from '@/utils/mobx-model-helper'
import { login } from '@/api/auth'

const TYPES = {
  LOGIN: 'LOGIN'
}

const AuthStore = Model.named('AuthStore')
  .props({
    loggedIn: types.boolean,
    loggedIn2: types.boolean
  })
  .actions((self) => ({
    setLogin() {
      self.loggedIn = !self.loggedIn
    },
    login(payload) {
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
    loggedIn2: false
  })

export { TYPES }
export default AuthStore
