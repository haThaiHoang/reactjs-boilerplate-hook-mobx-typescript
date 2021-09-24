import styled from 'styled-components'

import Button from '@/components/button'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  > * {
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const ButtonSection = (): JSX.Element => (
  <section>
    <p className="section-title">
      Button
    </p>
    <div className="section-body">
      <StyledDiv>
        <Button onClick={() => null}>Normal</Button>
        <Button onClick={() => null} size="small">Small</Button>
        <Button onClick={() => null} rounded>Rounded</Button>
        <Button onClick={() => null} loading>Loading</Button>
      </StyledDiv>
    </div>
  </section>
)

export default ButtonSection
