import { act, renderHook } from '@testing-library/react'
import { usePopup } from '../../../src/react/components/Popup'

const ADD_EVENT_LISTENER = jest.spyOn(document, 'addEventListener')
const REMOVE_EVENT_LISTENER = jest.spyOn(document, 'removeEventListener')

beforeEach(jest.clearAllMocks)

describe('Use Popup', () => {
  it('init with is showing false', () => {
    const { result } = renderHook(usePopup)
    expect(result.current.bind.isShowing).toEqual(false)
  })

  it('toggle is showing on invoking click', () => {
    const { result } = renderHook(usePopup)

    act(result.current.click)
    expect(result.current.bind.isShowing).toEqual(true)

    act(result.current.click)
    expect(result.current.bind.isShowing).toEqual(false)
  })

  it('has correct effect dependencies', () => {
    const { result } = renderHook(usePopup)
    expect(result.current.bind.closeHandlerEffect.deps).toEqual([
      result.current.bind.isShowing,
    ])
  })

  it('calls listener in effect correctly', () => {
    const { result } = renderHook(usePopup)
    act(result.current.click)

    act(() => {
      const cleanup = result.current.bind.closeHandlerEffect.effect()
      expect(ADD_EVENT_LISTENER).toHaveBeenCalled()
      expect(REMOVE_EVENT_LISTENER).not.toHaveBeenCalled()
      if (cleanup) cleanup()
      expect(REMOVE_EVENT_LISTENER).toHaveBeenCalled()
    })
  })
})
