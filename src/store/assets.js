import { Model } from '@/utils/mobx-model-helper'
import {
  uploadFiles
} from '@/api/assets'

const TYPES = {
  UPLOAD_FILES: 1
}

const AssetsStore = Model.named('AssetsStore')
  .actions((self) => ({
    uploadFiles(payload) {
      return self.request({
        type: TYPES.UPLOAD_FILES,
        api: uploadFiles,
        payload
      })
    }
  }))

export {
  TYPES
}
export default AssetsStore.create()
