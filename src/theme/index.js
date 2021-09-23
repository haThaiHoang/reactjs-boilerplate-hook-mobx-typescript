import { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import * as Images from './images'
import * as Colors from './colors'

class Theme extends Component {
  state = {
    primary: Colors.PRIMARY
  }

  // _switchTheme = (type) => {
  //   this.setState({
  //     primary: type === 1 ? Colors.PRIMARY : type === 2 ? Colors.PRIMARY2 : Colors.PRIMARY3
  //   })
  // }

  render() {
    const { children } = this.props
    const theme = {
      ...this.state
      // switchTheme: this._switchTheme
    }

    return (
      <ThemeProvider theme={theme}>
        <>
          {children}
        </>
      </ThemeProvider>
    )
  }
}

export {
  Images,
  Colors
}

export default Theme
