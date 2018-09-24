import React, { Component } from 'react'

import SessionsList from './SessionsList'

class AtAGlance extends Component {
  render() {
    const { sessions, sessionStartTime, sessionEndTime } = this.props
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
}

export default AtAGlance
