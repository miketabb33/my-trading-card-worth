/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { CARD_BLUEPRINT_DTO } from '../../../__MOCKS__/cardBlueprintDto.mock'
import * as MyCardClientModule from '../../../../src/react/network/myCardClient'
import { MyCardCondition } from '../../../../src/core/types/MyCardCondition'
import { useInAddCardButton } from '../../../../src/react/components/card-catalog/AddCardButton'

const ADD_MY_CARD = jest.spyOn(MyCardClientModule, 'addMyCard')

ADD_MY_CARD.mockResolvedValue()

describe('Use In Add Card Button', () => {
  it('should set loading to false and set showCheckmark to true after add my card completes', async () => {
    const { result } = renderHook(() => useInAddCardButton(CARD_BLUEPRINT_DTO))

    await act(async () => await result.current.click())

    expect(ADD_MY_CARD).toHaveBeenCalledWith({
      cardTraderId: CARD_BLUEPRINT_DTO.cardTraderId,
      name: CARD_BLUEPRINT_DTO.name,
      condition: MyCardCondition.NearMint,
    })

    expect(result.current.showCheckmark).toEqual(true)
    expect(result.current.isLoading).toEqual(false)
    expect(result.current.isDisabled).toEqual(true)
  })
})