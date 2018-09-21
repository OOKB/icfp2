import cli from 'better-console'
import _ from 'lodash'
import humps from 'lodash-humps'
import { titleize } from 'inflection'
import sanitizeHtml from 'sanitize-html'
import titleId from './src/titleid'

const authorIndex = {}

function doTitleize(str) {
  // If the string is empty or false return it.
  if (!str) return str
  // Cast every value to a string type.
  const result = str.toString()
  // Titleize if all lower or all upper.
  if (result === result.toUpperCase() || result === result.toLowerCase()) {
    return titleize(result)
  }
  return result
}

function addAuthor(sessionCode) {
  return ({ firstname, lastname, presenter }) => {
    const id = firstname + lastname
    const sessCode = presenter ? `<strong>${sessionCode}</strong>` : sessionCode
    if (authorIndex[id]) {
      authorIndex[id].sessionCodes.push(sessCode)
    } else {
      authorIndex[id] = { firstname, lastname, sessionCodes: [sessCode] }
    }
  }
}

function fixAuthor({
  firstname, lastname, company, presenter,
}) {
  let companyStr = company
  if (company && company.toString().split(' ').length > 1) {
    companyStr = doTitleize(company)
  }
  const auth = {
    company: companyStr,
    firstname: doTitleize(firstname),
    lastname: doTitleize(lastname),
    presenter,
    // ...rest
  }
  return auth
}

function fixPanelDescription(description) {
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
  return _.values(panelPresentationIndex)
}

function fixPresentation({
  orderof, description, authors = [], ...rest
}, i, { sessionType, sessionCode }) {
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

  // Poster authors.
  if (sessionType === 'Poster presentations' || sessionType === 'Poster') {
    const idParts = presentation.id.toString().split('.')
    presentation.id = `${idParts[0]}.${_.padEnd(idParts[1], 2, '0')}`
    delete presentation.id
    _.each(presentation.authors, addAuthor(`Poster ${presentation.id}`))
    presentation.description = _.pick(presentation.description, 'title')
  } else if (sessionType === 'Oral' || sessionType === 'IBP Interactive session') {
    _.each(presentation.authors, addAuthor(sessionCode))
    presentation.description = _.pick(presentation.description, 'title')
  } else if (sessionType === 'Flash (Speed round)' || sessionType === 'Workshop') {
    _.each(presentation.authors, addAuthor(sessionCode))
  } else if (sessionType === 'Preformed Panel') {
    presentation.panelPresentations = fixPanelDescription(presentation.description)
    presentation.description = {}
    _.each(presentation.authors, addAuthor(sessionCode))
  }
  // if (description && description.Title) {
  //   presentation.description = {title: doTitleize(description.Title)};
  // }

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
  presentations, sessionDescription, sessionChairs, sessionDate, sessionType, ...rest
}) {
  const newItem = {
    presentations: presentations.map((presentation, i) => fixPresentation(presentation, i, rest)),
    sessionChairs: sessionChairs.map(fixAuthor),
    sessionDate: sessionDate || 'none',
    sessionDescription: fixDescription(sessionDescription),
    sessionType: sessionType || 'Opening',
    trackId: titleId(rest.trackName),
    ...rest,
  }
  // Add authors to index.
  if (newItem.sessionChairs.length) {
    _.each(newItem.sessionChairs, addAuthor(`<em>${newItem.sessionCode}</em>`))
  }

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
  const items = _.map(humps(data), fixDataItem)
  const {
    Poster, Workshop, Opening, ...sessions
  } = _.groupBy(items, 'sessionType')
  apiData = {
    trackIds: _.uniq(_.map(items, 'trackId')),
    sessionIds: _.keys(sessions),
    posters: addGrouping(Poster),
    opening: addGrouping(Opening),
    workshop: addGrouping(Workshop),
    sessions: addGrouping(_.concat(_.values(sessions))),
    // sessions: _.filter(items, (item) => {
    // return (item.sessionType === 'Oral Presentations' || item.sessionType === 'Preformed Panel')
    // })
  }
  apiData.authors = _.sortBy(_.values(authorIndex), ['lastname', 'firstname'])
  cli.log('return new data')
  return { apiData, data }
}
