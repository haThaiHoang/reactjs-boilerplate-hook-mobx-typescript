import { Model } from '@/utils/mobx-model-helper'
import {
  uploadFiles
} from '@/api/assets'

const AssetsStore = Model.named('AssetsStore')
  .actions((self) => ({
    uploadFiles(payload: File[]) {
      return self.request({
        api: uploadFiles,
        payload
      })
    }
  }))
  .create()

export default AssetsStore
