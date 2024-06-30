/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import * as MyCardClientModule from '../../../../../src/react/network/myCardClient'
import { useInRemoveCardButton } from '../../../../../src/react/components/card-catalog/card-button/RemoveCardButton'

const REMOVE_MY_CARD = jest.spyOn(MyCardClientModule, 'removeMyCard')
const REFRESH = jest.fn()

REMOVE_MY_CARD.mockResolvedValue()

beforeEach(jest.clearAllMocks)

describe('Use In Remove Card Button', () => {
  it('should set loading to false and set showCheckmark to true after remove my card completes', async () => {
    const { result } = renderHook(() => useInRemoveCardButton(REFRESH))

    await act(async () => await result.current.click())

    expect(REFRESH).toHaveBeenCalled()

    expect(result.current.shouldShowCheckmark).toEqual(true)
    expect(result.current.shouldShowLoading).toEqual(false)
    expect(result.current.isDisabled).toEqual(true)
    expect(result.current.title).toEqual('Remove')
  })
})
