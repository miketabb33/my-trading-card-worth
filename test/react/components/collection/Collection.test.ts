/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { CARD_BLUEPRINT_DTO } from '../../../core/__MOCKS__/cardBlueprintDto.mock'

import * as MyCardClient from '../../../../src/react/network/myCardClient'
import { useInCollection } from '../../../../src/react/components/collection/Collection'
import { UseApiReturn } from '../../../../src/react/network/useApi'
import { CardBlueprintDto } from '../../../../src/core/types/CardBlueprintDto'

const REFRESH = jest.fn()
const USE_MY_CARDS = jest.spyOn(MyCardClient, 'useMyCards')

const USE_MY_CARDS_RETURN: UseApiReturn<CardBlueprintDto[]> = {
  data: null,
  isLoading: false,
  refresh: REFRESH,
}

beforeEach(jest.clearAllMocks)

describe('Use In Collection', () => {
  it('should init as empty array', () => {
    USE_MY_CARDS.mockReturnValue(USE_MY_CARDS_RETURN)
    const { result } = renderHook(useInCollection)
    expect(result.current.myCards).toEqual([])
  })

  it('should return cards when available', () => {
    const cards = [CARD_BLUEPRINT_DTO, CARD_BLUEPRINT_DTO]
    USE_MY_CARDS.mockReturnValue({ ...USE_MY_CARDS_RETURN, data: cards })
    const { result } = renderHook(useInCollection)
    expect(result.current.myCards).toEqual(cards)
  })

  it('should trigger refresh', () => {
    USE_MY_CARDS.mockReturnValue(USE_MY_CARDS_RETURN)
    const { result } = renderHook(useInCollection)
    act(() => result.current.refresh())
    expect(REFRESH).toHaveBeenCalled()
  })
})
