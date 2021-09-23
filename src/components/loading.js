import styled from 'styled-components'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Colors } from '@/theme'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    display: block;
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.primary};
    border-left-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
    border-right-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
    animation: rotation 1s infinite linear;
  }
  
  &.small {
    &::after {
      width: 25px;
      height: 25px;
      border: 4px solid ${({ theme }) => theme.primary};
      border-left-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
      border-right-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
    }
  }
`

const Loading = ({ size, className }) => (
  <StyledDiv
    className={classnames(size, className)}
  />
)
Loading.propTypes = {
  size: PropTypes.oneOf(['small'])
}

export default Loading
