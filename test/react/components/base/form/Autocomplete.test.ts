/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useWithAutocomplete } from '../../../../../src/react/components/base/form/Autocomplete'
import * as FilterAutocompleteModule from '../../../../../src/react/components/base/form/utilities/filterAutocomplete'
import { ExpansionDto } from '../../../../../src/core/types/ExpansionDto'
import * as Dropdown from '../../../__MOCKS__/dropdownOption.mock'

const FILTER_AUTOCOMPLETE = jest.spyOn(
  FilterAutocompleteModule,
  'filterAutocomplete'
)

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

beforeEach(jest.clearAllMocks)

describe('Use With Autocomplete', () => {
  it('should set filtered options when options change', async () => {
    const { result } = renderHook(() =>
      useWithAutocomplete<Dropdown.FakeDropdownData>({})
    )
    expect(result.current.bind.dropdownBind.options).toEqual([])

    act(() => result.current.setOptions(DROPDOWN_OPTIONS))
    await act(
      async () => await result.current.bind.optionsChangedEffect.effect()
    )

    expect(result.current.bind.dropdownBind.options).toEqual(DROPDOWN_OPTIONS)
    expect(result.current.bind.optionsChangedEffect.deps).toEqual([
      DROPDOWN_OPTIONS,
    ])
  })

  it('should trigger item selected functionality when on click item is invoked', async () => {
    const OPTION_SELECTED = jest.fn()

    const { result } = renderHook(() =>
      useWithAutocomplete<Dropdown.FakeDropdownData>({
        didSelectOption: OPTION_SELECTED,
      })
    )
    expect(result.current.bind.inputBind.value).toEqual('')
    expect(result.current.selectedOption).toBeNull()

    await act(
      async () => await result.current.bind.optionsChangedEffect.effect()
    )

    act(() =>
      result.current.bind.dropdownBind.onOptionClick(Dropdown.DROPDOWN_OPTION_1)
    )

    expect(result.current.bind.inputBind.value).toEqual(
      Dropdown.DROPDOWN_OPTION_1.title
    )
    expect(result.current.selectedOption).toEqual(
      Dropdown.DROPDOWN_OPTION_1.data
    )

    expect(OPTION_SELECTED).toHaveBeenCalledWith(
      Dropdown.DROPDOWN_OPTION_1.data
    )
  })

  it('should handle on input change', () => {
    FILTER_AUTOCOMPLETE.mockReturnValue(DROPDOWN_OPTIONS)
    const { result } = renderHook(() => useWithAutocomplete<ExpansionDto>({}))
    expect(result.current.bind.inputBind.value).toEqual('')
    expect(result.current.bind.dropdownBind.options).toEqual([])

    const VALUE = 'value'
    const CHANGE_EVENT = {
      target: { value: VALUE },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => result.current.bind.inputBind.onChange(CHANGE_EVENT))

    expect(result.current.bind.inputBind.value).toEqual(VALUE)
    expect(result.current.bind.dropdownBind.options).toEqual(DROPDOWN_OPTIONS)
  })
})
