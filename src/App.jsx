import { keys } from 'lodash/fp'
import React from 'react'
import PropTypes from 'prop-types'
import json from './data'
import Apps from './Apps'
import PageIndex from './PageIndex'
import { buildData } from './clientUtils'
// Create Document Component

const { authors, items } = json
const data = buildData(items)
console.log(data.opening)
const family = data.overviewTracks.returnsInvestmentFamilyPlanningDemographicDividend
const reproductive = data.overviewTracks.sexualReproductiveHealthRightsAmongAdolescentsYouth
const faith = data.overviewTracks.faithFamilyPlanning
const pages = {
  '/opening': { items: data.opening, layout: 'sessions' },
  '/workshop': { items: data.workshop, layout: 'sessions' },
  '/sessions': { items: data.sessions, layout: 'sessions' },
  '/posters': { items: data.posters, layout: 'posters', keyId: 'sessionCode' },
  '/authors': { items: authors, layout: 'authors', keyId: 'id' },
  '/overview': { items: data.overview, layout: 'overview' },
  '/sideshow': { items: data.sideEvents, layout: 'sessions', keyId: 'sessionCode' },
  '/overview/family': { items: family, layout: 'overview' },
  '/overview/reproductive': { items: reproductive, layout: 'overview' },
  '/overview/faith': { items: faith, layout: 'overview' },
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
