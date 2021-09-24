import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  padding: 30px 0;
  
  h1 {
    font-size: 25px;
  }
`

const Home = (): JSX.Element => {
  const { t } = useTranslation('home')

  return (
    <Page>
      <Container>
        <Content>
          <h1>{t('hello')}</h1>
        </Content>
      </Container>
    </Page>
  )
}

export default Home
