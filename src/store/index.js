import { Provider } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

import Configs from '@/configs'
import ui from './ui'
import assets from './assets'
import auth from './auth'
import products from './products'

export const history = createBrowserHistory({ basename: Configs.BASE_NAME })

const stores = {
  ui,
  assets,
  auth,
  products
}

export default ({ children }) => (
  <Provider {...stores}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
)
