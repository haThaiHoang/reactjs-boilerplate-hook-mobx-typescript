import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'
import FetchableTableSection from './fetchable-table-section'
import ModalSection from './modal-section'
import TypographySection from './typography-section'
import ButtonSection from './button-section'
import ToastSection from './toast-section'
import FormSection from './form-section'

const Content = styled.div`
  padding: 30px 0 100px;

  section {
    margin-bottom: 40px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: 25px;
      margin-bottom: 10px;
    }
    
    .section-body {
      padding: 20px;
      border-radius: 5px;
      background-color: white;
    }
  }
`

export default () => (
  <Page>
    <Container>
      <Content>
        <TypographySection />
        <ButtonSection />
        <FormSection />
        <FetchableTableSection />
        <ToastSection />
        <ModalSection />
      </Content>
    </Container>
  </Page>
)
