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

export default () => {
  const onClick = (type) => {
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
          <Button type="primary" onClick={() => onClick('show')}>Show</Button>
          <Button type="primary" onClick={() => onClick('warning')}>Warning</Button>
          <Button type="primary" onClick={() => onClick('error')}>Error</Button>
          <Button onClick={() => onClick('duration')}>Custom dutation</Button>
        </StyledDiv>
      </div>
    </section>
  )
}
