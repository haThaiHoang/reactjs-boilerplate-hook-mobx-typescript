import PropTypes from 'prop-types'
import styled from 'styled-components'

import Typography from './typography'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`

interface IProps {
  message?: string
  className?: string
}

const NoDataBox = ({ message, className }: IProps) => (
  <StyledDiv className={className}>
    <Typography>
      {message || 'No data'}
    </Typography>
  </StyledDiv>
)
NoDataBox.propTypes = {
  message: PropTypes.string
}

export default NoDataBox
