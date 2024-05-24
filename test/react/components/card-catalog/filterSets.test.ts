import { filterSets } from '../../../../src/react/components/card-catalog/filterSets'
import * as Set from '../../../__MOCKS__/cardSetDto.mock'

const SETS = [
  Set.CARD_SET_DTO_1,
  Set.CARD_SET_DTO_2,
  Set.CARD_SET_DTO_3,
  Set.CARD_SET_DTO_4,
  Set.CARD_SET_DTO_5,
  Set.CARD_SET_DTO_6,
  Set.CARD_SET_DTO_7,
  Set.CARD_SET_DTO_8,
]
describe('Filter sets', () => {
  it('should return empty array when sets is null', () => {
    const results = filterSets(null, 'any')
    expect(results).toEqual([])
  })
  it('should return all sets when search is empty', () => {
    const results = filterSets(SETS, '')
    expect(results).toEqual(SETS)
  })
  it('should return a specific set', () => {
    const results = filterSets(SETS, 'Fossil')
    expect(results).toEqual([Set.CARD_SET_DTO_8])
  })
  it('should return sets with the text', () => {
    const results = filterSets(SETS, 'Promos')
    expect(results.length).toEqual(4)
    expect(results).toEqual([
      Set.CARD_SET_DTO_2,
      Set.CARD_SET_DTO_3,
      Set.CARD_SET_DTO_6,
      Set.CARD_SET_DTO_7,
    ])
  })
  it('should not be case sensitive', () => {
    const results = filterSets(SETS, 'jUNglE')
    expect(results).toEqual([Set.CARD_SET_DTO_5])
  })

  it('should match é to e', () => {
    const results = filterSets(SETS, 'Pokemon')
    expect(results).toEqual([Set.CARD_SET_DTO_1])
  })
})
