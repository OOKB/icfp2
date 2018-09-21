import React from 'react'
import PropTypes from 'prop-types'

import Author from './Author'
import Poster from './Poster'
import SessionDay from './SessionDay'
import SessionDayReview from './SessionDayReview'

const templates = {
  posters: Poster,
  authors: Author,
  overview: SessionDayReview,
}

function Apps({ items, layout, keyId }) {
  const ItemTemplate = templates[layout] || SessionDay

  return (
    <div id={`type-${layout}`}>
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
  layout: PropTypes.string.isRequired,
}

export default Apps
