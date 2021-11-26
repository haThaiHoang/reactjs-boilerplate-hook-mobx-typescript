import { Component } from 'react'

import Modal from '@/components/modal'

class ExampleModal extends Component {
  state = {
    isOpen: false
  }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  render() {
    const { isOpen } = this.state

    return (
      <Modal
        title="Hello!"
        visible={isOpen}
        onCancel={this.close}
      >
        <p>This is example modal</p>
      </Modal>
    )
  }
}

export default ExampleModal
