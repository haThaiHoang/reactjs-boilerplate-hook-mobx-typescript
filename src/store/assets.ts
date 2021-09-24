import { Instance } from 'mobx-state-tree'

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
  .create()

interface IAssetsStore extends Instance<typeof AssetsStore> {}

export { TYPES }
export type { IAssetsStore }
export default AssetsStore as IAssetsStore
