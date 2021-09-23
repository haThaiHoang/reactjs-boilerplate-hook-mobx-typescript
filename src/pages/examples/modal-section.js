import { Component } from 'react'
import styled from 'styled-components'

import Button from '@/components/button'
import Confirmable from '@/components/confirmable'
import Toast from '@/components/toast'
import ExampleModal from './example-modal'

const StyledDiv = styled.div`
  display: flex;
  
  > * {
    margin-right: 10px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`

class ModalSection extends Component {
  _showConfirmBox = async () => {
    const ok = await Confirmable.open({
      content: 'Are you sure to delete a record',
      acceptButtonText: 'OK'
    })

    if (ok) {
      Toast.show('Delete record successfully')
    }
  }

  render() {
    return (
      <section>
        <p className="section-title">
          Modal
        </p>
        <div className="section-body">
          <StyledDiv>
            <Button
              type="primary"
              onClick={() => this._exampleModal.open()}
            >
              Open Modal
            </Button>
            <Button
              type="primary"
              onClick={this._showConfirmBox}
            >
              Show confirm box
            </Button>
          </StyledDiv>
          <ExampleModal
            ref={(ref) => { this._exampleModal = ref }}
          />
        </div>
      </section>
    )
  }
}

export default ModalSection
