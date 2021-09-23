import { Component } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  padding: 30px 0;
  
  h1 {
    font-size: 25px;
  }
`

@withTranslation('home')
class Home extends Component {
  state = {}

  render() {
    const { t } = this.props

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
}

export default Home
