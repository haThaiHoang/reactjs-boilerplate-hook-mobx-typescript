import { types } from 'mobx-state-tree'

import { Model } from '@/utils/mobx-model-helper'
import { login } from '@/api/auth'

const AuthStore = Model.named('AuthStore')
  .props({
    loggedIn: types.boolean
  })
  .actions((self) => ({
    setLogin() {
      self.loggedIn = !self.loggedIn
    },
    login(payload: any) {
      return self.request({
        api: login,
        payload,
        onSuccess: () => {
          self.loggedIn = true
        }
      })
    }
  }))
  .create({
    loggedIn: false
  })

export default AuthStore
