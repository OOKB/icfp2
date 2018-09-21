import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presentation from './Presentation'

class Poster extends Component {
  render() {
    const {
      sessionName, sessionStartTime, sessionEndTime, sessionRoom, presentations,
    } = this.props
    const sessionTime = `${sessionStartTime}-${sessionEndTime}`

    return (
      <div className="poster-session">

        {/* 1 set of meta-data listings per poster-session */}
        <div className="sessionName">{sessionName}</div>
        <div className="sessionTime">{sessionTime}</div>
        <div className="sessionRoom">{sessionRoom}</div>
        {/* <!-- day? --> */}

        <div className="columns">
          { presentations.map(item => (
            <Presentation key={item.id} {...item} />
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
