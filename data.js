import cli from 'better-console'
import _ from 'lodash'
import _fp from 'lodash/fp'
import humps from 'lodash-humps'
import sanitizeHtml from 'sanitize-html'
import {
  addAuthors, doTitleize, fixAuthor, isPoster,
  rmNoData, sortPresentations, titleId, validPresenations,
} from './src/utils'

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
}, position) {
  const newItem = {
    sessionChairs: sessionChairs.map(fixAuthor),
    sessionDate: sessionDate || 'none',
    sessionDescription: fixDescription(sessionDescription),
    sessionType: sessionType || 'Opening',
    trackId: titleId(rest.trackName || sessionType),
    position,
    ...rest,
  }
  if (!newItem.sessionCode) {
    newItem.sessionCode = sessionId.toString()
    newItem.sessionCodeErr = true
  } else {
    const idParts = newItem.sessionCode.toString().split('.')
    if (idParts.length === 3) {
      newItem.sessionCode = `${idParts[0]}.${idParts[1]}.${_.padStart(idParts[2], 2, '0')}`
    }
  }
  newItem.presentations = fixPresentations(newItem)(presentations)
  return newItem
}

const getItems = _fp.flow(humps, rmNoData, items => _.map(items, fixDataItem))

const getAuthors = _fp.flow(
  _fp.reduce(addAuthors, {}),
  _fp.values,
  _fp.sortBy(['lastSort', 'firstname']),
)
const getUniq = fieldId => _fp.flow(_fp.map(fieldId), _.uniq)

export default function fixData(data) {
  let apiData = null
  cli.log('fetch new data')
  cli.log('transform new data')
  const items = getItems(data)

  apiData = {
    authors: getAuthors(items),
    items,
    trackIds: getUniq('trackId')(items),
    sessionIds: getUniq('sessionType')(items),
  }
  cli.log('return new data')
  return { apiData, data }
}
