import { Component } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

import Typography from '@/components/typography'
import Button from '@/components/button'

const StyledModal = styled(Modal)`
  width: 300px!important;
  
  .ant-modal-content {
    border-radius: 6px;
  
    .ant-modal-close {
      display: none;
    }
  
    .ant-modal-body {
      padding: 0;
    
      .modal-content {
        .body {
          padding: 20px;
          
          .action-box {
            padding-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .action-button {
              margin-right: 15px;
              
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
`

let instance

class Confirmable extends Component {
  static propTypes = {}

  state = {
    visible: false,
    content: null,
    acceptButtonText: null,
    hideCancelButton: false
  }

  static setInstance = (ref) => {
    instance = ref
  }

  static open = (...params) => {
    if (instance) {
      return instance.open(...params)
    }

    return null
  }

  open = ({ content, acceptButtonText, hideCancelButton }) => new Promise((resolve) => {
    this._resolve = resolve
    this.setState({
      visible: true,
      content,
      acceptButtonText,
      hideCancelButton
    })
  })

  _onClose = () => {
    this.setState({
      visible: false
    })
  }

  _onCancel = () => {
    this._resolve(false)

    this._onClose()
  }

  _onAccept = () => {
    this._onClose()

    setTimeout(() => {
      this._resolve(true)
    }, 300)
  }

  render() {
    const { visible, content, acceptButtonText, hideCancelButton } = this.state

    return (
      <StyledModal
        visible={visible}
        centered
        destroyOnClose
        onCancel={this._onCancel}
        footer={null}
      >
        <div className="modal-content">
          <div className="body">
            <Typography style={{ wordBreak: 'break-all' }}>
              {content}
            </Typography>
            <div className="action-box">
              {!hideCancelButton && (
                <Button
                  onClick={this._onCancel}
                  className="action-button"
                >
                  Close
                </Button>
              )}
              <Button
                type="primary"
                onClick={this._onAccept}
                className="action-button"
              >
                {acceptButtonText || 'OK'}
              </Button>
            </div>
          </div>
        </div>
      </StyledModal>
    )
  }
}

export default Confirmable
