import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { selectActive } from 'redux-history-sync'

import App from './App'
import createStore from './createStore'
import registerServiceWorker from './registerServiceWorker'

/* global window */
const store = createStore()

ReactDOM.render(
  createElement(Provider, { store },
    createElement(connect(selectActive)(App))),
  window.document.getElementById('root'),
)
registerServiceWorker()
