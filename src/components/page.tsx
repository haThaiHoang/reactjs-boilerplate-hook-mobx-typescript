import { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: #f3f5f7;
  flex: 1;
  min-width: 0;
`

interface IProps {
  className?: string
}

class Page extends Component<IProps> {
  _div: any

  scrollTop = () => {
    this._div.scrollTop = 0
  }

  render() {
    const { children, className, ...props } = this.props

    return (
      <>
        <Div
          {...props}
          ref={(ref) => { this._div = ref }}
          className={className}
        >
          {children}
        </Div>
      </>
    )
  }
}

export default Page
