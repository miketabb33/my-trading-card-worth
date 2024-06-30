/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { useInCardCatalog } from '../../../../src/react/components/card-catalog/CardCatalog'
import * as AutocompleteModule from '../../../../src/react/components/base/form/Autocomplete'
import * as setsClientModule from '../../../../src/react/network/setsClient'
import { CARD_BLUEPRINT_DTO } from '../../../core/__MOCKS__/cardBlueprintDto.mock'
import * as UseRouterClient from '../../../../src/react/router/useRouter'

const FETCH_SETS = jest.spyOn(setsClientModule, 'fetchSet')
const USE_SETS_DATA = jest.spyOn(setsClientModule, 'useSetsData')

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

describe('Use In Card Catalog', () => {
  it('should init as empty array', () => {
    USE_WITH_AUTOCOMPLETE.mockReturnValue(USE_WITH_AUTOCOMPLETE_RETURN)
    const { result } = renderHook(useInCardCatalog)
    expect(result.current.blueprints).toEqual([])
  })

  it('should fetch set and set state when selected set has a value', async () => {
    USE_WITH_AUTOCOMPLETE.mockReturnValue({
      ...USE_WITH_AUTOCOMPLETE_RETURN,
    })

    GET_PARAM.mockReturnValue(23)

    FETCH_SETS.mockResolvedValue({
      data: { blueprints: [CARD_BLUEPRINT_DTO], details: null },
      errors: null,
      isSuccessful: true,
    })

    const { result } = renderHook(useInCardCatalog)

    await act(async () => await result.current.fetchBlueprintEffect.effect())

    expect(FETCH_SETS).toHaveBeenCalledWith(23)
    expect(result.current.blueprints).toEqual([CARD_BLUEPRINT_DTO])
    expect(result.current.fetchBlueprintEffect.deps).toEqual([23])
  })
})
