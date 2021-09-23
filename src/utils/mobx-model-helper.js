import { types, flow, getSnapshot, applySnapshot, destroy } from 'mobx-state-tree'
import i18n from '@/translations/i18n'

import Toast from '@/components/toast'
import Misc from '@/utils/misc'
import Request from '@/utils/request'
import ERROR_MESSAGES from '@/translations/error-messages'
import { history } from '@/store'
import Storage from './storage'

const Model = types.model('MobxModelHelper', {
  type: types.maybeNull(types.number),
  error: types.frozen()
})
  .actions((self) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    remove(item) {
      destroy(item)
    },

    request: flow(function* ({
      type,
      api,
      payload,
      onSuccess,
      onError,
      handleError,
      disabledErrorMessage,
      successMessage
    }) {
      if (type) {
        self.type = type
      }
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
          history.replace('/login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          const errorMessages = ERROR_MESSAGES[i18n.language]['error-messages']

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

      self.type = null

      return { success, data, payload }
    })
  }))

export {
  Model
}
