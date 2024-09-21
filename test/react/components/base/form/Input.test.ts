import { renderHook } from '@testing-library/react'
import { useWithInput } from '../../../../../src/react/components/base/form/Input'
import { act } from 'react'

const ON_CHANGE = jest.fn()
const ON_CLICK = jest.fn()

const VALUE = 'value'
const CHANGE_EVENT = {
  target: { value: VALUE },
} as unknown as React.ChangeEvent<HTMLInputElement>

const MOUSE_EVENT = {} as unknown as React.MouseEvent<HTMLInputElement, MouseEvent>

beforeEach(jest.clearAllMocks)

describe('Use With Input', () => {
  it('should be able to change value', () => {
    const { result } = renderHook(() => useWithInput({}))

    act(() => result.current.bind.onChange(CHANGE_EVENT))

    expect(result.current.bind.value).toEqual(VALUE)
  })

  it('should be able to set value', () => {
    const { result } = renderHook(() => useWithInput({}))

    act(() => result.current.setValue(VALUE))

    expect(result.current.bind.value).toEqual(VALUE)
  })

  it('should call on change when changed', () => {
    const { result } = renderHook(() => useWithInput({ onChange: ON_CHANGE }))

    act(() => result.current.bind.onChange(CHANGE_EVENT))

    expect(ON_CHANGE).toHaveBeenCalled()
  })

  it('should call on click when clicked', () => {
    const { result } = renderHook(() => useWithInput({ onClick: ON_CLICK }))

    act(() => result.current.bind.onClick(MOUSE_EVENT))

    expect(ON_CLICK).toHaveBeenCalled()
  })
})
