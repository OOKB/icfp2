import React, { Component } from 'react'

function SessionsList(props) {
  const {
    sessionCode, sessionName, sessionRoom, sessionStartTime, sessionEndTime,
  } = props
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

export default SessionsList

// Repeat per number
