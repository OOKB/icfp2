import React from 'react'
import PropTypes from 'prop-types'
import SessionsList from './SessionsList'

function AtAGlance(props) {
  const { sessions, sessionStartTime, sessionEndTime } = props
  const timeStr = `${sessionStartTime} - ${sessionEndTime}`

  return (
    <div className="ataglance">
      <h3>{timeStr}</h3>

      <div className="sessions-list">
        { sessions.map(item => (
          <SessionsList key={item.sessionCode} {...item} />
        ))}
      </div>
    </div>
  )
}
AtAGlance.propTypes = {

}

export default AtAGlance
