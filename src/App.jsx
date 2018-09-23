import { keys } from 'lodash/fp'
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
  '/posters': { items: json.posters, layout: 'posters', keyId: 'sessionCode' },
  '/authors': { items: json.authors, layout: 'authors', keyId: 'id' },
  '/overview': { items: json.sessions, layout: 'overview' },
  '/sideshow': { items: json.sideEvents, layout: 'sessions', keyId: 'sessionCode' },
}

const App = ({ dispatch, pathname }) => {
  const pageInfo = pages[pathname]
  if (!pageInfo) return <PageIndex dispatch={dispatch} pages={keys(pages)} />
  return <Apps {...pageInfo} />
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
}
export default App
