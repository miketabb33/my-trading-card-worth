import ExpansionSorter from '../../../../src/server/logic/set/ExpansionSorter'
import {
  SORTABLE_EXPANSION_FOSSIL_MOCK,
  SORTABLE_EXPANSION_MCDONALD_MOCK,
  SORTABLE_EXPANSION_ORIGINAL_MOCK,
  SORTABLE_EXPANSION_OTHER1_MOCK,
  SORTABLE_EXPANSION_OTHER2_MOCK,
  SORTABLE_EXPANSION_PLATINUM_MOCK,
  SORTABLE_EXPANSION_POP_MOCK,
} from '../../__MOCKS__/sortableExpansion.mock'

describe('Expansion Sorter', () => {
  it('sorts main series in reverse, then other series in order, then remaining series', () => {
    const sorter = new ExpansionSorter()
    const sortableExpansions = [
      SORTABLE_EXPANSION_OTHER1_MOCK,
      SORTABLE_EXPANSION_MCDONALD_MOCK,
      SORTABLE_EXPANSION_FOSSIL_MOCK,
      SORTABLE_EXPANSION_OTHER2_MOCK,
      SORTABLE_EXPANSION_PLATINUM_MOCK,
      SORTABLE_EXPANSION_POP_MOCK,
      SORTABLE_EXPANSION_ORIGINAL_MOCK,
    ]
    const result = sorter.sort(sortableExpansions)
    expect(result.length).toEqual(7)
    expect(result[0]).toEqual(SORTABLE_EXPANSION_PLATINUM_MOCK)
    expect(result[1]).toEqual(SORTABLE_EXPANSION_FOSSIL_MOCK)
    expect(result[2]).toEqual(SORTABLE_EXPANSION_ORIGINAL_MOCK)
    expect(result[3]).toEqual(SORTABLE_EXPANSION_MCDONALD_MOCK)
    expect(result[4]).toEqual(SORTABLE_EXPANSION_POP_MOCK)
    expect(result[5]).toEqual(SORTABLE_EXPANSION_OTHER1_MOCK)
    expect(result[6]).toEqual(SORTABLE_EXPANSION_OTHER2_MOCK)
  })
})
