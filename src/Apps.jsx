import React from 'react'
import PropTypes from 'prop-types'

import Author from './Author'
import Poster from './Poster'
import SessionDay from './SessionDay'
import SessionDayReview from './SessionDayReview'

const templates = {
  posters: Poster,
  authors: Author,
  review: SessionDayReview,
}

function Apps({ items, type, keyId }) {
  const ItemTemplate = templates[type] || SessionDay

  return (
    <div id={`type-${type}`}>
      { items.map(item => <ItemTemplate key={item[keyId]} {...item} />) }
    </div>
  )
}
Apps.defaultProps = {
  keyId: 'sessionDate',
}
Apps.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyId: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default Apps
