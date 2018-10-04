import cli from 'better-console'
import _ from 'lodash'
import _fp from 'lodash/fp'
import humps from 'lodash-humps'
import sanitizeHtml from 'sanitize-html'
import {
  addAuthorEvent, doTitleize, fixAuthor, isPoster, isTypePoster,
  rmNoData, sortPresentations, titleId, validPresenations,
} from './src/utils'

const getEventCode = _.cond([
  [
    isTypePoster,
    _fp.flow(_fp.get('sessionName'), _fp.replace(' Session ', '.'), str => str.concat('.')),
  ],
  [
    _fp.stubTrue,
    _fp.get('sessionCode'),
  ],
])

function addAuthors(authorIndex, item) {
  const eventCode = getEventCode(item)
  return _fp.reduce(
    (result, { authors, id }) => addAuthorEvent(result, eventCode, id)(authors),
    addAuthorEvent(authorIndex, eventCode, false)(item.sessionChairs),
    item.presentations,
  )
}

export function getAuthId(firstname, lastname, company) {
  const coStr = company ? ` ${company.toString().substr(0, 3)}` : ''
  return titleId(`${firstname} ${lastname}${coStr}`)
}

export function fixPanelDescription(description) {
  const panelPresentationIndex = {}
  function addPanelIndex(matches, fieldId, value) {
    if (matches) {
      const index = parseInt(matches[1], 10)
      if (!panelPresentationIndex[index]) {
        panelPresentationIndex[index] = { index }
      }
      panelPresentationIndex[index][fieldId] = value
    }
  }
  _.each(description, (value, key) => {
    const isTitle = key.match(/^presentation([1-9][0-9]?)Title$/)
    addPanelIndex(isTitle, 'title', value)
    const isPresenter = key.match(/^presenterOfPresentation([1-9][0-9]?)/)
    addPanelIndex(isPresenter, 'presenter', value)
  })
  return _fp.values(panelPresentationIndex)
}

function fixDescription(sessionDescription) {
  if (!sessionDescription) {
    return sessionDescription
  }
  return sanitizeHtml(sessionDescription, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
  })
}

const fixPresentation = ({ sessionCode, sessionType }) => ({
  orderof, description, authors = [], ...rest
}) => {
  const presentation = { ...rest, description: {} }
  presentation.authors = authors.map(auth => fixAuthor({
    ...auth,
    presenter: sessionType === 'Preformed Panel' ? undefined : auth.presenter,
  }))
  if (isPoster(sessionType)) {
    const idParts = presentation.id.toString().split('.')
    if (idParts.length === 2) {
      presentation.id = `${idParts[0]}.${_.padEnd(idParts[1], 3, '0')}`
    }
  }
  // Fix description fields.
  if (_.isString(description)) {
    presentation.description.text = fixDescription(description)
  } else {
    _.each(description, (desc) => {
      presentation.description[titleId(desc.fieldLabel)] = desc.fieldValue
    })
  }
  if (presentation.description.title) {
    presentation.description.title = doTitleize(presentation.description.title)
  }
  if (presentation.title) {
    presentation.title = doTitleize(presentation.title)
  }
  if (presentation.authors.length > 1) {
    presentation.authors = _fp.orderBy(
      ['isPresenter', 'lastName', 'firstName', 'isChair'], ['desc', 'asc', 'asc'], presentation.authors,
    )
  }
  presentation.key = _fp.kebabCase([sessionCode, rest.id])
  return presentation
}
const fixPresentations = session => _fp.flow(
  validPresenations,
  _fp.map(fixPresentation(session)),
  sortPresentations(session),
)

function fixDataItem({
  presentations, sessionDescription, sessionChairs,
  sessionDate, sessionId, sessionType, ...rest
}) {
  const newItem = {
    sessionChairs: sessionChairs.map(fixAuthor),
    sessionDate: sessionDate || 'none',
    sessionDescription: fixDescription(sessionDescription),
    sessionType: sessionType || 'Opening',
    trackId: titleId(rest.trackName || sessionType),
    ...rest,
  }
  if (!newItem.sessionCode) {
    newItem.sessionCode = sessionId.toString()
    newItem.sessionCodeErr = true
  }
  newItem.presentations = fixPresentations(newItem)(presentations)
  return newItem
}

function addGrouping(items) {
  const dateGroups = _.groupBy(items, 'sessionDate')
  const days = []
  _.each(_.keys(dateGroups), (sessionDate) => {
    days.push({
      sessionDate,
      timeSlots: _.map(_.groupBy(dateGroups[sessionDate], 'sessionStartTime'), sessions => ({
        sessionStartTime: sessions[0].sessionStartTime,
        sessionEndTime: sessions[0].sessionEndTime,
        sessions: _.map(sessions, (session) => {
          if (session.sessionDescription) {
            session.sessionDescription = sanitizeHtml(session.sessionDescription, {
              allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
            })
          }
          return session
        }),
      })),
    })
  })
  return days
}

const getItems = _fp.flow(humps, rmNoData, _fp.map(fixDataItem))
const getSessions = _fp.flow(
  _fp.values,
  _fp.flatten,
  addGrouping,
)

export default function fixData(data) {
  let apiData = null
  cli.log('fetch new data')
  cli.log('transform new data')
  const items = getItems(data)
  const authorIndex = _fp.reduce(addAuthors, {}, items)

  const {
    Poster, Workshop, Opening, ...sessions
  } = _.groupBy(items, 'sessionType')
  const sideEventItems = _fp.filter(item => !!item.presentations.length, sessions['Side Events'])
  const sideEvents = addGrouping(sessions['Side Events'])
  delete sessions['Side Events']
  apiData = {
    trackIds: _.uniq(_.map(items, 'trackId')),
    sessionIds: _.keys(sessions),
    posters: Poster,
    opening: addGrouping(Opening),
    workshop: addGrouping(Workshop),
    sideEvents,
    overview: addGrouping(items),
    sideEventItems: _fp.map(_fp.pick(['sessionCode']), sideEventItems),
    // sessions: _.filter(items, (item) => {
    // return (item.sessionType === 'Oral Presentations' || item.sessionType === 'Preformed Panel')
    // })
  }
  delete sessions.Plenary

  apiData.sessions = getSessions(sessions)
  apiData.authors = _.sortBy(_.values(authorIndex), ['lastSort', 'firstname'])
  cli.log('return new data')
  return { apiData, data }
}
