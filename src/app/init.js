import { Component } from 'react'
import setLocale from 'yup/lib/setLocale'
import FontFaceObserver from 'fontfaceobserver'

import Request from '@/utils/request'
import Storage from '@/utils/storage'

const font = new FontFaceObserver('Nunito')

setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

class Init extends Component {
  state = {
    inited: false
  }

  async componentDidMount() {
    const token = Storage.get('ACCESS_TOKEN')
    Request.setAccessToken(token)

    this.setState({ inited: true })

    try {
      await font.load()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Load Fontface failed')
    }

    this._hidePreloading()
  }

  _hidePreloading() {
    const preloading = document.getElementsByClassName('preloading')[0]

    const fadeEffect = setInterval(() => {
      if (!preloading.style.opacity) {
        preloading.style.opacity = 1
      }
      if (preloading.style.opacity === '1') {
        preloading.style.opacity = 0
      } else {
        clearInterval(fadeEffect)
        preloading.style.display = 'none'
      }
    }, 500)
  }

  render() {
    const { children } = this.props
    const { inited } = this.state

    return inited ? children : null
  }
}

export default Init
