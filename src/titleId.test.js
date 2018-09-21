/* globals describe test expect */
import titleId from './titleId'

const title = 'Reproductive rights and gender empowerment'
describe('titleId', () => {
  test('creates title', () => {
    expect(titleId(title)).toBe('reproductiveRightsGenderEmpowerment')
  })
})
