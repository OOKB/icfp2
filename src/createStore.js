import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getInitState, historyMiddleware, syncHistoryWithStore } from 'redux-history-sync'
import reducer from './reducer'

/* global window */

export default function initStore() {
  const initState = {
    history: getInitState(window.location, window.document.title, window.history),
  }
  const store = createStore(
    reducer,
    initState,
    composeWithDevTools( // Can use typical redux compose function instead.
      applyMiddleware(
        historyMiddleware(window.history),
      ),
    ),
  )
  syncHistoryWithStore(store, window)
  return store
}
