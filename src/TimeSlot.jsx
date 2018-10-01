import React from 'react'
import PropTypes from 'prop-types'
import { format, parse } from 'date-fns'

import PerformedPanel from './PerformedPanel'
// import OralPresentations from './OralPresentations';

const hourMin = time => format(parse(time), 'HH:mm')

function Timeslot({ sessionStartTime, sessionEndTime, sessions }) {
  const timeStr = `${hourMin(sessionStartTime)} - ${hourMin(sessionEndTime)}`
  return (
    <div className="timeslot">
      <h3>{timeStr}</h3>
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
