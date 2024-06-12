import { act, renderHook } from '@testing-library/react'
import { useWithSelect } from '../../../../../src/react/components/base/form/Select'
import * as Dropdown from '../../../../__MOCKS__/dropdownOption.mock'
import * as PopupModule from '../../../../../src/react/components/Popup'

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

const USE_POPUP = jest.spyOn(PopupModule, 'usePopup')
const TOGGLE_POPUP = jest.fn()
USE_POPUP.mockReturnValue({
  toggle: TOGGLE_POPUP,
} as unknown as PopupModule.UsePopupReturn)

describe('Use With Select', () => {
  it('should init selected option to first item', () => {
    const { result } = renderHook(() => useWithSelect(DROPDOWN_OPTIONS))
    expect(result.current.selectedOption).toEqual(
      Dropdown.DROPDOWN_OPTION_1.data
    )
  })

  it('should select option when onOptionClick is invoked', () => {
    const { result } = renderHook(() => useWithSelect(DROPDOWN_OPTIONS))
    act(() => result.current.bind.onOptionClick(Dropdown.DROPDOWN_OPTION_4))
    expect(TOGGLE_POPUP).toHaveBeenCalled()
    expect(result.current.selectedOption).toEqual(
      Dropdown.DROPDOWN_OPTION_4.data
    )
  })
})
