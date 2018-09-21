import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { flow, get } from 'lodash/fp'
import { connect, Provider } from 'react-redux'
import { selectActive } from 'redux-history-sync'

import App from './App'
import createStore from './createStore'
import registerServiceWorker from './registerServiceWorker'

/* global window */
const store = createStore()
const getLocation = flow(get('history'), selectActive, get('location'))

ReactDOM.render(
  createElement(Provider, { store },
    createElement(connect(getLocation)(App))),
  window.document.getElementById('root'),
)
registerServiceWorker()
