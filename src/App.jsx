import React from 'react'
import PropTypes from 'prop-types'
import json from './data'
import Apps from './Apps'
import PageIndex from './PageIndex'
// Create Document Component

const pages = {
  '/opening': { items: json.opening, layout: 'sessions' },
  '/workshop': { items: json.workshop, layout: 'sessions' },
  '/sessions': { items: json.sessions, layout: 'sessions' },
  '/posters': { items: json.posters, layout: 'posters', keyId: 'sessionId' },
  '/authors': { items: json.authors, layout: 'authors', keyId: 'id' },
}

const App = ({ dispatch, pathname }) => {
  const pageInfo = pages[pathname]
  if (!pageInfo) return <PageIndex dispatch={dispatch} />
  const { items, layout } = pageInfo
  return <Apps items={items} type={layout} />
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
}
export default App
