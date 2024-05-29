/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useWithSetSearchBar } from '../../../../src/react/components/card-catalog/SetSearchBar'
import * as SetsClientModule from '../../../../src/react/network/setsClient'
import {
  CARD_SET_DTO_5,
  CARD_SET_DTO_ARRAY,
} from '../../../__MOCKS__/cardSetDto.mock'
import * as PopupModule from '../../../../src/react/components/Popup'
import * as FilterSetsModule from '../../../../src/react/components/card-catalog/filterSets'

const USE_SETS = jest.spyOn(SetsClientModule, 'useSetsData')

const USE_POPUP = jest.spyOn(PopupModule, 'usePopup')
const TOGGLE_POPUP = jest.fn()
USE_POPUP.mockReturnValue({
  toggle: TOGGLE_POPUP,
} as unknown as PopupModule.UsePopupReturn)

const FILTER_SETS = jest.spyOn(FilterSetsModule, 'filterSets')

beforeEach(jest.clearAllMocks)

describe('Use With Search Bar', () => {
  it('should set filtered sets when sets load', async () => {
    USE_SETS.mockReturnValue({
      data: CARD_SET_DTO_ARRAY,
      isLoading: false,
      refresh: () => {},
    })
    const { result } = renderHook(useWithSetSearchBar)
    expect(result.current.bind.dropdownBind.filteredSets).toEqual([])

    await act(async () => await result.current.bind.setsLoadedEffect.effect())

    expect(result.current.bind.dropdownBind.filteredSets).toEqual(
      CARD_SET_DTO_ARRAY
    )

    expect(result.current.bind.setsLoadedEffect.deps).toEqual([
      CARD_SET_DTO_ARRAY,
    ])
  })

  it('should trigger item selected functionality when on click item is invoked', () => {
    const { result } = renderHook(useWithSetSearchBar)
    expect(result.current.bind.inputValue).toEqual('')
    expect(result.current.selectedSet).toBeNull()

    act(() => result.current.bind.dropdownBind.onItemClick(CARD_SET_DTO_5))

    expect(result.current.bind.inputValue).toEqual(CARD_SET_DTO_5.name)
    expect(result.current.selectedSet).toEqual(CARD_SET_DTO_5)
    expect(TOGGLE_POPUP).toHaveBeenCalled()
  })

  it('should handle on input change', () => {
    FILTER_SETS.mockReturnValue(CARD_SET_DTO_ARRAY)
    const { result } = renderHook(useWithSetSearchBar)
    expect(result.current.bind.inputValue).toEqual('')
    expect(result.current.bind.dropdownBind.filteredSets).toEqual([])

    const VALUE = 'value'
    const CHANGE_EVENT = {
      target: { value: VALUE },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    act(() => result.current.bind.onInputValueChange(CHANGE_EVENT))

    expect(result.current.bind.inputValue).toEqual(VALUE)
    expect(result.current.bind.dropdownBind.filteredSets).toEqual(
      CARD_SET_DTO_ARRAY
    )
  })
})
