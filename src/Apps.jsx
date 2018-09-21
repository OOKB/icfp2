import React from 'react'
import PropTypes from 'prop-types'

import Poster from './Poster'
import SessionDay from './SessionDay'
import SessionDayReview from './SessionDayReview'

function Apps({ items, type }) {
  let ItemTemplate = SessionDay
  let keyFieldId = 'sessionDate'

  if (type === 'posters') {
    ItemTemplate = Poster
    keyFieldId = 'sessionID'
  } else if (type === 'other') {
    ItemTemplate = SessionDayReview
  }

  return (
    <div id={`type-${type}`}>
      { items.map(item => <ItemTemplate key={item[keyFieldId]} {...item} />) }
    </div>
  )
}

Apps.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

export default Apps
