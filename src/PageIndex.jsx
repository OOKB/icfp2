import React from 'react'
import PropTypes from 'prop-types'
import { createHistory } from 'redux-history-sync'


export function createOnClick(dispatch, pageId) {
  return (event) => {
    event.preventDefault()
    return dispatch(createHistory(pageId))
  }
}

function PageIndex({ dispatch, pages }) {
  return (
    <div>
      <h2>Page Index</h2>
      <p>It will take a second or two to load these pages. They are huge.</p>
      <ul>
        {
          pages.map(pageId => (
            <li key={pageId}>
              <a href={pageId} onClick={createOnClick(dispatch, pageId)}>{pageId.substr(1)}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
PageIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}
export default PageIndex
