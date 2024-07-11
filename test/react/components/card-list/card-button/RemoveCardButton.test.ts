/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import * as MyCardClientModule from '../../../../../src/react/network/myCardClient'
import { useInRemoveCardButton } from '../../../../../src/react/components/card-list/card-button/RemoveCardButton'

const REMOVE_MY_CARD = jest.spyOn(MyCardClientModule, 'removeMyCard')
const REFRESH = jest.fn()

const BLUEPRINT_ID = 1234

REMOVE_MY_CARD.mockResolvedValue()

beforeEach(jest.clearAllMocks)

describe('Use In Remove Card Button', () => {
  it('should set loading to false and set showCheckmark to true after remove my card completes', async () => {
    const cardsOwned = 5

    const { result } = renderHook(() =>
      useInRemoveCardButton(BLUEPRINT_ID, cardsOwned, REFRESH)
    )

    await act(async () => await result.current.click())

    expect(REFRESH).toHaveBeenCalled()
    expect(REMOVE_MY_CARD).toHaveBeenCalledWith(BLUEPRINT_ID)

    expect(result.current.shouldShowCheckmark).toEqual(true)
    expect(result.current.shouldShowLoading).toEqual(false)
    expect(result.current.isDisabled).toEqual(true)
    expect(result.current.title).toEqual('Remove')
  })

  it('should be disabled when cards owned is 0', () => {
    const cardsOwned = 0

    const { result } = renderHook(() =>
      useInRemoveCardButton(BLUEPRINT_ID, cardsOwned, REFRESH)
    )

    expect(result.current.isDisabled).toEqual(true)
  })

  it('should NOT be disabled when cards owned is over 0', () => {
    const cardsOwned = 5

    const { result } = renderHook(() =>
      useInRemoveCardButton(BLUEPRINT_ID, cardsOwned, REFRESH)
    )

    expect(result.current.isDisabled).toEqual(false)
  })
})
