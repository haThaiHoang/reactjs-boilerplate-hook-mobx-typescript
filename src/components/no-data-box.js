import PropTypes from 'prop-types'
import styled from 'styled-components'

import Typography from './typography'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`

const NoDataBox = ({ message, className }) => (
  <StyledDiv className={className}>
    <Typography description>
      {message || 'No data'}
    </Typography>
  </StyledDiv>
)
NoDataBox.propTypes = {
  message: PropTypes.string
}

export default NoDataBox
