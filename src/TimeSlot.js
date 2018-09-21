import React, { Component } from 'react'

import PerformedPanel from './PerformedPanel'
// import OralPresentations from './OralPresentations';

class Timeslot extends Component {
  render() {
    const { sessionStartTime, sessionEndTime, sessions } = this.props
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`

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
}

export default Timeslot
