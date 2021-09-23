import { Model } from '@/utils/mobx-model-helper'
import { login } from '@/api/auth'

const TYPES = {
  LOGIN: 1
}

const AuthStore = Model.named('AuthStore')
  .actions((self) => ({
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

export {
  TYPES
}
export default AuthStore.create({
  loggedIn: false
})
