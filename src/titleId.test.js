/* globals describe test expect */
import titleId from './titleId'

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
