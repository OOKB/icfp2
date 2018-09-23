import cli from 'better-console'
import _ from 'lodash'
import _fp from 'lodash/fp'
import humps from 'lodash-humps'
import { oneOf } from 'cape-lodash'
import sanitizeHtml from 'sanitize-html'
import {
  addAuthorEvent, doTitleize, fixAuthor, titleId,
} from './src/utils'

const getEventCode = _.cond([
  [
    _fp.conforms({ sessionType: oneOf(['Poster', 'Poster presentations']) }),
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

function fixPresentation({
  orderof, description, authors = [], ...rest
}, i, { sessionType }) {
  const presentation = { ...rest, description: {} }
  presentation.authors = authors.map(auth => fixAuthor({
    ...auth,
    presenter: sessionType === 'Preformed Panel' ? undefined : auth.presenter,
  }))
  // Fix description fields.
  if (_.isString(description)) {
    presentation.description.text = description
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
  if (presentation.authors.length > 1 && presentation.authors[0].presenter !== 1) {
    const presenter = _.remove(presentation.authors, { presenter: 1 })
    presentation.authors = presenter.concat(presentation.authors)
  }
  return presentation
}

function fixDescription(sessionDescription) {
  if (!sessionDescription) {
    return sessionDescription
  }
  return sanitizeHtml(sessionDescription, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
  })
}

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
    newItem.sessionCode = `[${sessionId.toString()}]`
    newItem.sessionCodeErr = true
  }
  newItem.presentations = presentations.map(
    (presentation, i) => fixPresentation(presentation, i, rest),
  )
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
export default function fixData(data) {
  let apiData = null
  cli.log('fetch new data')
  cli.log('transform new data')
  const items = _fp.flow(humps, _fp.map(fixDataItem))(data)
  const authorIndex = _fp.reduce(addAuthors, {}, items)

  const {
    Poster, Workshop, Opening, ...sessions
  } = _.groupBy(items, 'sessionType')
  const sideEvents = addGrouping(sessions['Side Events'])
  delete sessions['Side Events']
  apiData = {
    trackIds: _.uniq(_.map(items, 'trackId')),
    sessionIds: _.keys(sessions),
    posters: Poster,
    opening: addGrouping(Opening),
    workshop: addGrouping(Workshop),
    sideEvents,
    sessions: addGrouping(_.flatten(_.values(sessions))),
    // sessions: _.filter(items, (item) => {
    // return (item.sessionType === 'Oral Presentations' || item.sessionType === 'Preformed Panel')
    // })
  }
  apiData.authors = _.sortBy(_.values(authorIndex), ['lastSort', 'firstname'])
  cli.log('return new data')
  return { apiData, data }
}
