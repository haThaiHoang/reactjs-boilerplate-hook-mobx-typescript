import styled from 'styled-components'

import Button from '@/components/button'
import Toast from '@/components/toast'

const StyledDiv = styled.div`
  display: flex;
  
  > * {
    margin-right: 10px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`

const ToastSection = (): JSX.Element => {
  const onClick = (type: 'show' | 'warning' | 'error' | 'duration') => {
    if (type === 'show') Toast.show('This is a toast')
    if (type === 'warning') Toast.warning('This is a warning toast')
    if (type === 'error') Toast.error('This is a error toast')
    if (type === 'duration') {
      Toast.show({
        content: 'This toast will show during 5 seconds',
        duration: 5
      })
    }
  }

  return (
    <section>
      <p className="section-title">
        Toast
      </p>
      <div className="section-body">
        <StyledDiv>
          <Button onClick={() => onClick('show')}>Show</Button>
          <Button onClick={() => onClick('warning')}>Warning</Button>
          <Button onClick={() => onClick('error')}>Error</Button>
          <Button onClick={() => onClick('duration')}>Custom dutation</Button>
        </StyledDiv>
      </div>
    </section>
  )
}

export default ToastSection
