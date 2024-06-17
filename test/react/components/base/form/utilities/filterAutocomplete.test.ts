import { filterAutocomplete } from '../../../../../../src/react/components/base/form/utilities/filterAutocomplete'
import * as Dropdown from '../../../../__MOCKS__/dropdownOption.mock'

const DROPDOWN_OPTIONS = [
  Dropdown.DROPDOWN_OPTION_1,
  Dropdown.DROPDOWN_OPTION_2,
  Dropdown.DROPDOWN_OPTION_3,
  Dropdown.DROPDOWN_OPTION_4,
  Dropdown.DROPDOWN_OPTION_5,
  Dropdown.DROPDOWN_OPTION_6,
  Dropdown.DROPDOWN_OPTION_7,
  Dropdown.DROPDOWN_OPTION_8,
]

describe('Filter Autocomplete', () => {
  it('should return empty array when sets is null', () => {
    const results = filterAutocomplete(null, 'any')
    expect(results).toEqual([])
  })
  it('should return all sets when search is empty', () => {
    const results = filterAutocomplete(DROPDOWN_OPTIONS, '')
    expect(results).toEqual(DROPDOWN_OPTIONS)
  })
  it('should return a specific set', () => {
    const results = filterAutocomplete(DROPDOWN_OPTIONS, 'Fossil')
    expect(results).toEqual([Dropdown.DROPDOWN_OPTION_8])
  })
  it('should return sets with the text', () => {
    const results = filterAutocomplete(DROPDOWN_OPTIONS, 'Promos')
    expect(results.length).toEqual(4)
    expect(results).toEqual([
      Dropdown.DROPDOWN_OPTION_2,
      Dropdown.DROPDOWN_OPTION_3,
      Dropdown.DROPDOWN_OPTION_6,
      Dropdown.DROPDOWN_OPTION_7,
    ])
  })
  it('should not be case sensitive', () => {
    const results = filterAutocomplete(DROPDOWN_OPTIONS, 'jUNglE')
    expect(results).toEqual([Dropdown.DROPDOWN_OPTION_5])
  })

  it('should match é to e', () => {
    const results = filterAutocomplete(DROPDOWN_OPTIONS, 'Pokemon')
    expect(results).toEqual([Dropdown.DROPDOWN_OPTION_1])
  })
})
