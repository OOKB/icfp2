import React from 'react'
import PropTypes from 'prop-types'
import { createHistory } from 'redux-history-sync'

const pages = ['posters', 'workshop', 'sessions', 'opening']

export function createOnClick(dispatch, pageId) {
  return (event) => {
    event.preventDefault()
    return dispatch(createHistory(`/${pageId}`))
  }
}

function PageIndex({ dispatch }) {
  return (
    <div>
      <h2>Page Index</h2>
      <p>It will take a second or two to load these pages. They are huge.</p>
      <ul>
        {
          pages.map(pageId => (
            <li key={pageId}>
              <a href={`/${pageId}`} onClick={createOnClick(dispatch, pageId)}>{pageId}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
PageIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
export default PageIndex
