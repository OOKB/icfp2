import React, { Component } from 'react'

import AtAGlance from './AtAGlance'

class Presentation extends Component {
  render() {
    const { sessionDate, timeSlots } = this.props
    return (
      <div className="day">

        <h2>{sessionDate}</h2>
        <p>At-a-glance</p>
        {
          timeSlots.map((item) => {
            const key = item.sessionStartTime + item.sessionEndTime
            return <AtAGlance key={key} {...item} />
          })
        }

      </div>
    )
  }
}

export default Presentation
