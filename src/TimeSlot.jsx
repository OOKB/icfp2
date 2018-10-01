import React from 'react'
import PropTypes from 'prop-types'
import { startEnd } from './clientUtils'
import PerformedPanel from './PerformedPanel'
// import OralPresentations from './OralPresentations';


function Timeslot({ sessionStartTime, sessionEndTime, sessions }) {
  return (
    <div className="timeslot">
      <h3>{startEnd(sessionStartTime, sessionEndTime)}</h3>
      <div className="columns">
        { sessions.map(item => (
          <PerformedPanel key={item.sessionCode} {...item} />
        ))}
      </div>
    </div>
  )
}
Timeslot.propTypes = {
  sessionStartTime: PropTypes.string.isRequired,
  sessionEndTime: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default Timeslot
