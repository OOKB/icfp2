import React from 'react'
import PropTypes from 'prop-types'

function getClassName(tagName, presenter) {
  if (tagName) return tagName
  // If no tagName defined we base it off the presenter value.
  return presenter ? 'presenter' : 'author'
}
function getAuthorName({
  events, firstname, lastname, nameSuffix, namePrefix,
}) {
  // THE AUTHOR INDEX PAGES.
  if (events) return `${lastname} ${nameSuffix}, ${namePrefix} ${firstname}; `
  // EVERYWHERE ELSE.
  return [namePrefix, firstname, lastname, nameSuffix].join(' ')
}

function eventStyle({ isPresenter, isChair }) {
  if (isPresenter) return { fontWeight: 'bold' }
  if (isChair) return { fontStyle: 'italic' }
  return {}
}
function Event({ eventCode, initial, ...rest }) {
  const separator = ', '
  return (
    <span style={eventStyle(rest)}>
      {eventCode}
      { initial && separator}
    </span>
  )
}
Event.propTypes = {
  eventCode: PropTypes.string.isRequired,
  initial: PropTypes.bool.isRequired,
}
function isInit(index, items) {
  return index < items.length - 1
}
function Author({
  company, id, isPresenter, events, tagName, ...other
}) {
  const fullName = getAuthorName({ events, isPresenter, ...other })
  return (
    <div className={getClassName(tagName, isPresenter)} title={id}>
      <p className="person">
        <span className="fullname">{fullName}</span>
        { company && <span className="company">{ company }</span> }
        { events && events.map((event, index) => (
          <Event key={event.eventCode} initial={isInit(index, events)} {...event} />))}
      </p>
    </div>
  )
}
Author.defaultProps = {
  company: null,
}
Author.propTypes = {
  company: PropTypes.string,
  id: PropTypes.string.isRequired,
}
export default Author
