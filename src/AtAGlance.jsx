import React from 'react'
import PropTypes from 'prop-types'
import SessionsList from './SessionsList'
import { startEnd } from './clientUtils'

function AtAGlance(props) {
  const { sessions, sessionStartTime, sessionEndTime } = props

  return (
    <div className="ataglance">
      <h3>{startEnd(sessionStartTime, sessionEndTime)}</h3>

      <div className="sessions-list">
        { sessions.map(item => (
          <SessionsList key={item.sessionCode} {...item} />
        ))}
      </div>
    </div>
  )
}
AtAGlance.propTypes = {
  sessionStartTime: PropTypes.string.isRequired,
  sessionEndTime: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AtAGlance
