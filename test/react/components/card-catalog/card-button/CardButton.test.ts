/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useWithCardButton } from '../../../../../src/react/components/card-catalog/card-button/CardButton'

const ACTION = jest.fn()
const REFRESH = jest.fn()

ACTION.mockResolvedValue({})

beforeEach(jest.clearAllMocks)

describe('Use With Card Button', () => {
  it('should set loading to false and set showCheckmark to true after action completes', async () => {
    const { result } = renderHook(() => useWithCardButton(ACTION, REFRESH))

    await act(async () => await result.current.click())

    expect(REFRESH).toHaveBeenCalled()
    expect(ACTION).toHaveBeenCalled()

    expect(result.current.shouldShowCheckmark).toEqual(true)
    expect(result.current.shouldShowLoading).toEqual(false)
    expect(result.current.isDisabled).toEqual(true)
    expect(result.current.title).toEqual('Action')
  })
})
