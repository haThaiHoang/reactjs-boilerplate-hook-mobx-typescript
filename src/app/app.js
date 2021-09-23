import ReactDOM from 'react-dom'

import '@/resources/styles'
import Store from '@/store'
import Theme from '@/theme'
import Init from '@/app/init'
import Routes from '@/app/routes'
import Confirmable from '@/components/confirmable'
import '@/translations/i18n'

const App = () => (
  <Store>
    <Theme>
      <Init>
        <Routes />
      </Init>
      <Confirmable
        ref={(ref) => Confirmable.setInstance(ref)}
      />
    </Theme>
  </Store>
)

ReactDOM.render(<App />, document.getElementById('application'))
