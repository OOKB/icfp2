/* globals describe test expect */
import _ from 'lodash/fp'
import { addAuthorEvent, fixAuthor, titleId } from './utils'

const title = 'Reproductive rights and gender empowerment'
const name = { first: 'Houédo Rachel Cornellia', last: 'Agbangla' }

describe('titleId', () => {
  test('creates title', () => {
    expect(titleId(title)).toBe('reproductiveRightsGenderEmpowerment')
  })
  test('with names', () => {
    expect(titleId(`${name.first} ${name.last}`)).toBe('houedoRachelCornelliaAgbangla')
  })
})
const chairs = _.map(fixAuthor, [
  {
    chairType: 'Session Chair',
    casehairOrder: 2,
    lastname: 'Rusatira',
    firstname: 'Jean Christophe',
    company: 'Bill & Melinda Gates Institute for Population and Reproductive Health ',
    contactId: 456,
  },
  {
    chairType: 'Session Chair',
    chairOrder: 2,
    lastname: 'Salmeron',
    firstname: 'Carolina',
    company: 'Bill and Melinda Gates Institute for Population and Reproductive Health',
    contactId: 8006,
  },
])
const authorIndex = {
  a456: {
    events: [
      {
        eventCode: 'a.b.', isPresenter: false, isChair: true,
      },
    ],
    firstname: 'Jean Christophe',
    id: 'a456',
    lastname: 'Rusatira',
  },
  a8006: {
    events: [
      {
        eventCode: 'a.b.', isPresenter: false, isChair: true,
      },
    ],
    firstname: 'Carolina',
    id: 'a8006',
    lastname: 'Salmeron',
  },
}
describe('addAuthorEvent', () => {
  const authors1 = addAuthorEvent({}, 'a.b.', false)(chairs)
  test('reduce correctly', () => {
    expect(authors1).toEqual(authorIndex)
  })
  test('2nd reduce', () => {
    const eventCode = 'a.c.'
    const authors2 = addAuthorEvent(authors1, eventCode, false)(chairs)
    const result2 = _.flow(
      _.set('a456.events[1]', { eventCode, isPresenter: false, isChair: true }),
      _.set('a8006.events[1]', { eventCode, isPresenter: false, isChair: true }),
    )(authorIndex)
    expect(authors2).toEqual(result2)
  })
})
