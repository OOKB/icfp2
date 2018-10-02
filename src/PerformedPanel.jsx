import React from 'react'
import PropTypes from 'prop-types'

import Presentation from './Presentation'
import Author from './Author'
import TrackColorDot from './TrackColorDot'

function PerformedPanel(props) {
  const {
    sessionCode, sessionName, sessionRoom,
    sessionDescription, sessionChairs, presentations, sessionType, trackId, trackName,
  } = props
  // const timeStr = `${sessionStartTime} - ${sessionEndTime}`;

  let DescriptionEl = false
  if (sessionDescription) {
    DescriptionEl = <div className="description" dangerouslySetInnerHTML={{ __html: sessionDescription }} />
  }

  const whereToBreak = "presentation " + `${ sessionCode }`

  return (
    <div className={ whereToBreak }>
      <header className="tryNottoBreak">
        { sessionCode ? <div className="sessioncode">{ sessionCode }</div> : false }
        <div className="sessionname">{ sessionName }</div>
        { sessionType ? (
          <div className="session-type">
            <strong className="smallcaps">Type:</strong>
            {' '}
            { sessionType }
          </div>
        ) : false }
        { trackId && <TrackColorDot trackId={trackId} /> }
        { trackName ? (
          <div className="trackname">
            <strong className="smallcaps">Track:</strong>
            {' '}
            { trackName }
          </div>
        ) : false }
        {/* <starttime>{ timeStr }</starttime> */}
        { trackName ? (
          <div className="sessionroom">
            <strong className="smallcaps">Location:</strong>
            {' '}
            { sessionRoom }
          </div>
        ) : false }

        { sessionChairs.map(item => (
          <Author key={item.id} tagName="moderator" {...item} />
        ))}
      </header>

      { DescriptionEl }

      { presentations.map(item => (
        <Presentation key={item.id} {...item} />
      ))}

    </div>
  )
}

PerformedPanel.propTypes = {
  sessionCode: PropTypes.string.isRequired,
  sessionName: PropTypes.string.isRequired,
  sessionRoom: PropTypes.string.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
}
export default PerformedPanel

// Preformed Panel
// [Session Number (i.e. 1.1.08)] [Title of Preformed Panel]
// [time] [Location]
// [Moderator]
// [All Presenter/Author(s)]

// [Presentation 1 Title]
// [Presenter of Presentation 1] – should include their organization

// i.e.: Marianne Amoss, Gates Institute;
// [Presentation 2 Title]
// [Presenter of Presentation 2]

// - - - - -

// Individual Abstracts
// [Session Number (i.e. 1.1.08)] [Title of Session]
// [time] [Location]

// [Co-Moderator], [Co-moderator]
// [All Author(s)], [Author’s Organization] – repeat per number of co-authors


// Repeat per number of abstracts
