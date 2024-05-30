import { act, renderHook } from '@testing-library/react'
import { useGlobalPopupProvider } from '../../../src/react/providers/GlobalPopupProvider'
import { CLICK_EVENT } from '../../__MOCKS__/clickEvent.mock'
import * as PopupModule from '../../../src/react/components/Popup'

const USE_POPUP = jest.spyOn(PopupModule, 'usePopup')

const CLICK = jest.fn()

USE_POPUP.mockReturnValue({
  click: CLICK,
} as unknown as PopupModule.UsePopupReturn)

beforeEach(jest.clearAllMocks)

describe('Global Popup Context', () => {
  it('should invoke show methods', () => {
    const { result } = renderHook(useGlobalPopupProvider)
    expect(result.current.children).toBeNull()

    const children = (() => 'Test')()

    act(() => result.current.show(CLICK_EVENT, children))
    expect(CLICK).toHaveBeenCalled()

    expect(result.current.children).toEqual(children)
  })
})
