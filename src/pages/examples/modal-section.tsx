import { useRef, useCallback } from 'react'
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

const ModalSection = (): JSX.Element => {
  const exampleModalRef: any = useRef(null)

  const showConfirmBox = useCallback(async () => {
    const ok = await Confirmable.open({
      content: 'Are you sure to delete a record',
      acceptButtonText: 'OK'
    })

    if (ok) {
      Toast.show('Delete record successfully')
    }
  }, [])

  return (
    <section>
      <p className="section-title">
        Modal
      </p>
      <div className="section-body">
        <StyledDiv>
          <Button
            onClick={() => exampleModalRef.current.open()}
          >
            Open Modal
          </Button>
          <Button
            onClick={showConfirmBox}
          >
            Show confirm box
          </Button>
        </StyledDiv>
        <ExampleModal
          ref={exampleModalRef}
        />
      </div>
    </section>
  )
}

export default ModalSection
