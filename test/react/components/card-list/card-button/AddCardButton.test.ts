/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { CARD_DTO } from '../../../../core/__MOCKS__/cardDto.mock'
import * as MyCardClientModule from '../../../../../src/react/network/collectionClient'
import { CardConditions } from '../../../../../src/core/types/CardCondition'
import { useInAddCardButton } from '../../../../../src/react/components/card-list/card-button/AddCardButton'

const ADD_MY_CARD = jest.spyOn(MyCardClientModule, 'addMyCard')
const REFRESH = jest.fn()

ADD_MY_CARD.mockResolvedValue()

const CONDITION = CardConditions.Mint

beforeEach(jest.clearAllMocks)

describe('Use In Add Card Button', () => {
  it('should set loading to false and set showCheckmark to true after add my card completes', async () => {
    const { result } = renderHook(() =>
      useInAddCardButton(CARD_DTO, CONDITION, REFRESH)
    )

    await act(async () => await result.current.click())

    expect(REFRESH).toHaveBeenCalled()

    expect(ADD_MY_CARD).toHaveBeenCalledWith({
      blueprintId: CARD_DTO.blueprintId,
      expansionId: CARD_DTO.expansionId,
      name: CARD_DTO.name,
      condition: CONDITION.id,
      imageUrlPreview: CARD_DTO.imageUrlPreview,
      imageUrlShow: CARD_DTO.imageUrlShow,
    })

    expect(result.current.shouldShowCheckmark).toEqual(true)
    expect(result.current.shouldShowLoading).toEqual(false)
    expect(result.current.isDisabled).toEqual(true)
    expect(result.current.title).toEqual('Add')
  })
})
