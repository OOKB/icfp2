import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TimeSlot from './TimeSlot'

class Presentation extends Component {
  render() {
    const { sessionDate, timeSlots } = this.props
    return (
      <div className="day">
        <h2>{sessionDate}</h2>
        {
          timeSlots.map((item) => {
            const key = item.sessionStartTime + item.sessionEndTime
            return <TimeSlot key={key} {...item} />
          })
        }
      </div>
    )
  }
}
Presentation.propTypes = {
  sessionDate: PropTypes.string.isRequired,
  timeSlots: PropTypes.array.isRequired,
}

export default Presentation
