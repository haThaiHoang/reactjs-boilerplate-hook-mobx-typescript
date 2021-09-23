import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  /* stylelint-disable */
`

export default ({ children, ...props }) => (
  <StyledModal
    centered
    // width={600}
    footer={null}
    {...props}
  >
    {children}
  </StyledModal>
)
