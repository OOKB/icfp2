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
      <sessioncode>{ sessionCode }</sessioncode>
      { separator }
      <sessionname><strong>{ sessionName }</strong></sessionname>
      { separator }
      <sessionroom>{ sessionRoom }</sessionroom>
      { separator }
    </div>
  )
}

export default SessionsList

// Repeat per number
