import { act, renderHook } from '@testing-library/react'
import { usePopup } from '../../../src/react/components/Popup'

const ADD_EVENT_LISTENER = jest.spyOn(document, 'addEventListener')
const REMOVE_EVENT_LISTENER = jest.spyOn(document, 'removeEventListener')

const STOP_PROPAGATION = jest.fn()

const EVENT = {
  stopPropagation: STOP_PROPAGATION,
} as unknown as React.MouseEvent<Element, MouseEvent>

beforeEach(jest.clearAllMocks)

describe('Use Popup', () => {
  it('init with is showing false', () => {
    const { result } = renderHook(usePopup)
    expect(result.current.bind.isShowing).toEqual(false)
  })

  it('toggle is showing on invoking click', () => {
    const { result } = renderHook(usePopup)

    act(() => result.current.click(EVENT))
    expect(result.current.bind.isShowing).toEqual(true)
    expect(STOP_PROPAGATION).toHaveBeenCalled()

    act(() => result.current.click(EVENT))
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
    act(() => result.current.click(EVENT))

    act(() => {
      const cleanup = result.current.bind.closeHandlerEffect.effect()
      expect(ADD_EVENT_LISTENER).toHaveBeenCalled()
      expect(REMOVE_EVENT_LISTENER).not.toHaveBeenCalled()
      if (cleanup) cleanup()
      expect(REMOVE_EVENT_LISTENER).toHaveBeenCalled()
    })
  })
})
