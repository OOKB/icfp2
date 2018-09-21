import React from 'react'
import PropTypes from 'prop-types'

const sessionColors = {
  30967: '#42434c',
  30976: '#303628',
  30980: '#148663',
  30819: '#afddcd',
  30847: '#bac5cf',
  30989: '#496a85',
  30932: '#4151a3',
  31000: '#3d2354',
  30876: '#7c51a1',
  30914: '#ac7892',
  31012: '#7d0021',
  31015: '#eb6d24',
  31019: '#fad57c',
  30950: '#decdba',
  30811: '#c8d29c',
}

function TrackColorDot({ sessionId }) {
  const color = sessionColors[sessionId]
  if (!color) return null
  return <div className="whatTrack" style={{ backgroundColor: color }}>dot</div>
}
TrackColorDot.propTypes = {
  sessionId: PropTypes.number.isRequired,
}
export default TrackColorDot
