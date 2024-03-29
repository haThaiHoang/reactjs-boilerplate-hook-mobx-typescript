import { types, flow, getSnapshot, applySnapshot, destroy } from 'mobx-state-tree'
import i18n from '@/translations/i18n'
import lodash from 'lodash'

import Toast from '@/components/toast'
import Misc from '@/utils/misc'
import Request from '@/utils/request'
import ERROR_MESSAGES from '@/translations/error-messages.json'
import Storage from './storage'

const Model = types.model('MobxModelHelper', {
  error: types.frozen()
})
  .actions((self: any) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    remove(item: any) {
      destroy(item)
    },

    request: flow(function* ({
      api,
      payload,
      onSuccess,
      onError,
      handleError,
      disabledErrorMessage,
      successMessage
    }) {
      self.error = null

      let data = null
      let success = false

      try {
        if (api) {
          const result = yield api(payload)

          if (onSuccess) onSuccess(result)

          if (successMessage) {
            Toast.show(successMessage)
          }

          success = true
          data = result
        }
      } catch (e) {
        const error = (yield Misc.getErrorJsonBody(e)) || e
        self.error = error
        data = error
        // eslint-disable-next-line no-console
        console.warn(error)

        if (['TOKEN_EXPIRED', 'TOKEN_INVALID', 'PERMISSION_DENIED'].includes(error.statusText)) {
          Request.removeAccessToken()
          Storage.remove('ACCESS_TOKEN')
          location.replace('/login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          const errorMessages = lodash.get(ERROR_MESSAGES, `${i18n.language}.error-messages`)

          if (handleError) {
            const handledError = handleError(error)

            if (handledError) {
              Toast.error(errorMessages[handledError] || handledError)
            }
          } else {
            Toast.error(
              (errorMessages[error.statusText] || error.statusText)
              || error.message
            )
          }
        }
      }

      return { success, data, payload }
    })
  }))

export {
  Model
}
