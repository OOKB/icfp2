import React, { Component } from 'react'

class SessionsList extends Component {
  render() {
    const {
      sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime,
    } = this.props
    const timeStr = `${sessionStartTime} - ${sessionEndTime}`
    const separator = '\u0009'

    return (
      <div className="item presentation">
        { separator }
        <div className="sessioncode">{ sessionCode }</div>
        { separator }
        <div className="sessionname"><strong>{ sessionName }</strong></div>
        { separator }
        <div className="sessionroom">{ sessionRoom }</div>
        { separator }
      </div>
    )
  }
}

export default SessionsList

// Repeat per number
