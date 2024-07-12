/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useInCatalog } from '../../../../src/react/components/catalog/Catalog'
import * as AutocompleteModule from '../../../../src/react/components/base/form/Autocomplete'
import * as setsClientModule from '../../../../src/react/network/setsClient'
import { CARD_BLUEPRINT_DTO } from '../../../core/__MOCKS__/cardBlueprintDto.mock'
import * as UseRouterClient from '../../../../src/react/router/useRouter'
import * as ExpansionProviderClient from '../../../../src/react/providers/ExpansionProvider'
import {
  CARD_SET_DTO_1,
  CARD_SET_DTO_2,
} from '../../../core/__MOCKS__/cardSetDto.mock'

const FETCH_SET = jest.spyOn(setsClientModule, 'fetchSet')
const USE_SETS_DATA = jest.spyOn(setsClientModule, 'useSetsData')
const USE_EXPANSION = jest.spyOn(ExpansionProviderClient, 'useExpansion')

const EXPANSIONS = [CARD_SET_DTO_1, CARD_SET_DTO_2]

USE_EXPANSION.mockReturnValue({
  expansions: EXPANSIONS,
  isLoading: false,
})

USE_SETS_DATA.mockReturnValue({
  data: [],
  isLoading: false,
  refresh: () => {},
})

const NAVIGATE_TO = jest.fn()
const GET_PARAM = jest.fn()

const USE_ROUTER = jest.spyOn(UseRouterClient, 'useRouter')

USE_ROUTER.mockReturnValue({
  navigateTo: NAVIGATE_TO,
  getParam: GET_PARAM,
  hostname: '',
  pathname: '',
})

const USE_WITH_AUTOCOMPLETE = jest.spyOn(
  AutocompleteModule,
  'useWithAutocomplete'
)

const USE_WITH_AUTOCOMPLETE_RETURN: AutocompleteModule.UseWithAutocompleteReturn<object> =
  {
    selectedOption: null,
    bind: {} as unknown as AutocompleteModule.AutocompleteProps<object>,
    setOptions: () => {},
  }

USE_WITH_AUTOCOMPLETE.mockReturnValue(USE_WITH_AUTOCOMPLETE_RETURN)

beforeEach(jest.clearAllMocks)

describe('Use In Catalog', () => {
  it('should init as empty array', () => {
    const { result } = renderHook(useInCatalog)
    expect(result.current.cardsDto).toEqual([])
  })

  it('should fetch set and set state when slug exists', async () => {
    GET_PARAM.mockReturnValue(CARD_SET_DTO_1.slug)

    FETCH_SET.mockResolvedValue({
      data: { blueprints: [CARD_BLUEPRINT_DTO], details: null },
      errors: null,
      isSuccessful: true,
    })

    const { result } = renderHook(useInCatalog)

    await act(
      async () =>
        await result.current.fetchExpansionDetailsAndCardsEffect.effect()
    )

    expect(FETCH_SET).toHaveBeenCalledWith(CARD_SET_DTO_1.cardTraderExpansionId)
    expect(result.current.cardsDto).toEqual([CARD_BLUEPRINT_DTO])
    expect(result.current.fetchExpansionDetailsAndCardsEffect.deps).toEqual([
      CARD_SET_DTO_1.slug,
      EXPANSIONS,
    ])
  })

  it('should NOT fetch set and set state when slug does not exist', async () => {
    GET_PARAM.mockReturnValue(null)

    const { result } = renderHook(useInCatalog)

    await act(
      async () =>
        await result.current.fetchExpansionDetailsAndCardsEffect.effect()
    )

    expect(FETCH_SET).not.toHaveBeenCalled()
  })
})
