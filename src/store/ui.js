import { types } from 'mobx-state-tree'

const UiStore = types.model('UiStore')
  .props({
    sideBarStatus: types.boolean
  })
  .actions((self) => ({
    setSideBarStatus(status) {
      self.sideBarStatus = status
    },

    toggleSideBar() {
      self.sideBarStatus = !self.sideBarStatus
    }
  }))

export default UiStore.create({
  sideBarStatus: true
})
