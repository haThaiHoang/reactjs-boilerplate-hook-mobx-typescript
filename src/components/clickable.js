import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.7;
  }
`

const Clickable = ({ children, className, onClick }) => (
  <StyledDiv
    className={className}
    onClick={onClick}
  >
    {children}
  </StyledDiv>
)
Clickable.propTypes = {
  onClick: PropTypes.func
}

export default Clickable
