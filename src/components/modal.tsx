import { Modal, ModalProps } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  /* stylelint-disable */
`

interface IProps extends ModalProps {
  children: any
}

const ModalComponent = ({ children, ...props }: IProps) => (
  <StyledModal
    centered
    // width={600}
    footer={null}
    {...props}
  >
    {children}
  </StyledModal>
)

export default ModalComponent
