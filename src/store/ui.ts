import { types } from 'mobx-state-tree'

const UiStore = types.model('UiStore')
  .props({
    sideBarStatus: types.boolean
  })
  .actions((self) => ({
    setSideBarStatus(status: boolean) {
      self.sideBarStatus = status
    },

    toggleSideBar() {
      self.sideBarStatus = !self.sideBarStatus
    }
  }))
  .create({
    sideBarStatus: true
  })

export default UiStore
