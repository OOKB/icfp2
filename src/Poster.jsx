import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { startEnd } from './clientUtils'

import Presentation from './Presentation'

class Poster extends Component {
  render() {
    const {
      sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations,
    } = this.props

    return (
      <div className="poster-session">

        {/* 1 set of meta-data listings per poster-session */}
        <div className="sessionName">{sessionName}</div>
        <div className="sessionTime">{startEnd(sessionStartTime, sessionEndTime)}</div>
        <div className="sessionRoom">{sessionRoom}</div>
        {/* <!-- day? --> */}

        <div className="columns">
          { presentations.map(item => (
            <Presentation {...item} divId={item.key} />
          ))}
        </div>

      </div>
    )
  }
}
Poster.propTypes = {
  sessionName: PropTypes.string.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  sessionEndTime: PropTypes.string.isRequired,
  sessionRoom: PropTypes.string.isRequired,
  presentations: PropTypes.array.isRequired,
}
export default Poster
