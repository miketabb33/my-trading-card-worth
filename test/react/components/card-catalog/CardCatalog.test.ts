/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useInCardCatalog } from '../../../../src/react/components/card-catalog/CardCatalog'
import * as SetSearchBarModule from '../../../../src/react/components/card-catalog/SetSearchBar'
import { CardSetDto } from '../../../../src/core/types/CardSetDto'
import * as setsClientModule from '../../../../src/react/network/setsClient'
import { CARD_BLUEPRINT_DTO } from '../../../__MOCKS__/cardBlueprintDto.mock'

const FETCH_SETS = jest.spyOn(setsClientModule, 'fetchSet')

const USE_WITH_SET_SEARCH_BAR = jest.spyOn(
  SetSearchBarModule,
  'useWithSetSearchBar'
)

const USE_WITH_SET_SEARCH_BAR_RETURN: SetSearchBarModule.UseWithSetSearchBarReturn =
  {
    selectedSet: null,
    bind: {} as unknown as SetSearchBarModule.SetSearchBarProps,
  }

describe('Use In Card Catalog', () => {
  it('should init as null', () => {
    USE_WITH_SET_SEARCH_BAR.mockReturnValue(USE_WITH_SET_SEARCH_BAR_RETURN)
    const { result } = renderHook(useInCardCatalog)
    expect(result.current.blueprints).toEqual(null)
  })

  it('should fetch set and set state when selected set has a value', async () => {
    const selectedSet: CardSetDto = {
      id: 23,
      name: 'Any set',
    }

    USE_WITH_SET_SEARCH_BAR.mockReturnValue({
      ...USE_WITH_SET_SEARCH_BAR_RETURN,
      selectedSet,
    })

    FETCH_SETS.mockResolvedValue({
      data: [CARD_BLUEPRINT_DTO],
      errors: null,
      isSuccessful: true,
    })

    const { result } = renderHook(useInCardCatalog)

    await act(async () => await result.current.fetchBlueprintEffect.effect())

    expect(FETCH_SETS).toHaveBeenCalledWith(selectedSet.id)
    expect(result.current.blueprints).toEqual([CARD_BLUEPRINT_DTO])
    expect(result.current.fetchBlueprintEffect.deps).toEqual([selectedSet])
  })
})
