import _ from 'lodash/fp'
import { titleize } from 'inflection'
import { oneOf } from 'cape-lodash'

export function doTitleize(str) {
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

const rmWords = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i']

export const titleId = _.flow(
  _.lowerCase,
  _.split(' '),
  _.uniq,
  _.pullAll(rmWords),
  _.camelCase,
)
function getCo(company) {
  if (company && company.toString().split(' ').length > 1) return doTitleize(company)
  return company.toString()
}
const getLastSort = _.flow(
  _.split(' '),
  _.dropWhile(name => _.lowerFirst(name) === name),
  _.deburr,
)
// const lowerSomeLast = namePart => _.cond([
//   [oneOf(['van', 'de', 'der', 'ter', 'een'])],
// ])
// const lastCap = _.flow(
//   doTitleize,
//   _.split(' '),
//   _.map(lowerSomeLast),
// )
export function fixAuthor(item) {
  const {
    contactId, email, firstname, lastname, company, presenter, ...rest
  } = item
  const author = _.pick(['nameSuffix', 'namePrefix'], rest)
  author.id = `a${contactId}`
  author.company = getCo(company)
  author.firstname = _.trim(doTitleize(firstname))
  author.lastname = _.trim(lastname) || email.split('@')[0]
  author.lastSort = getLastSort(author.lastname) || author.lastname
  author.isPresenter = !!presenter
  return author
}

const eventInfo = (eventCode, id, author) => ({
  eventCode: id ? eventCode + id : eventCode,
  isChair: !id,
  isPresenter: author.isPresenter,
})
const getAuthorInfo = _.flow(
  _.set('events', []),
  _.omit(['isPresenter', 'company']),
)
export const addAuthorEvent = (authors, eventCode, id) => _.reduce((authorIndex, author) => {
  const item = authorIndex[author.id] || getAuthorInfo(author)
  item.events = [...item.events, eventInfo(eventCode, id, author)]
  return _.set(author.id, item, authorIndex)
}, authors)
