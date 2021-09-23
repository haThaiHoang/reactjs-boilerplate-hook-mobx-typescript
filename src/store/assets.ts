import { Model } from '@/utils/mobx-model-helper'
import {
  uploadFiles
} from '@/api/assets'

const TYPES = {
  UPLOAD_FILES: 'UPLOAD_FILES'
}

const AssetsStore = Model.named('AssetsStore')
  .actions((self) => ({
    uploadFiles(payload: File[]) {
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
