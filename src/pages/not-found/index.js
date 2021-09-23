import { Component } from 'react'
import styled from 'styled-components'

import Container from '@/components/container'

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 75vh;

  .title {
    font-size: 100px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
`

export default class NotFound extends Component {
  _onClick = () => {
    const { history } = this.props

    history.push('/')
  }

  render() {
    return (
      <Container className="not-found">
        <Content>
          <p className="title">404</p>
          <p className="subtitle">This is not the web page you are looking for</p>
        </Content>
      </Container>
    )
  }
}
