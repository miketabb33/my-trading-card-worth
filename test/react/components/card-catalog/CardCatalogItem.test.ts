import { renderHook } from '@testing-library/react'
import { useInCardCatalogItem } from '../../../../src/react/components/card-catalog/CardCatalogItem'
import { CARD_BLUEPRINT_DTO } from '../../../__MOCKS__/cardBlueprintDto.mock'
import * as ProfileProviderModule from '../../../../src/react/providers/ProfileProvider'
import { PROFILE_CONTEXT_TYPE } from '../../../__MOCKS__/profileContextType.mock'
import * as GlobalPopupProviderModule from '../../../../src/react/providers/GlobalPopupProvider'
import { GLOBAL_CONTEXT_POPUP_CONTEXT } from '../../../__MOCKS__/globalPopupContextType.mock'
import { CLICK_EVENT } from '../../../__MOCKS__/clickEvent.mock'
import * as MyCardClientModule from '../../../../src/react/network/myCardClient'
import { MyCardCondition } from '../../../../src/core/types/MyCardCondition'

const USE_PROFILE = jest.spyOn(ProfileProviderModule, 'useProfile')
const USE_GLOBAL_POPUP = jest.spyOn(GlobalPopupProviderModule, 'useGlobalPopup')
const ADD_MY_CARD = jest.spyOn(MyCardClientModule, 'addMyCard')

const IS_LOGGED_IN = true

USE_PROFILE.mockReturnValue({
  ...PROFILE_CONTEXT_TYPE,
  isLoggedIn: IS_LOGGED_IN,
})

const SHOW = jest.fn()
USE_GLOBAL_POPUP.mockReturnValue({
  ...GLOBAL_CONTEXT_POPUP_CONTEXT,
  show: SHOW,
})

ADD_MY_CARD.mockResolvedValue()

describe('Use In Card Catalog Item', () => {
  it('should return values', () => {
    const { result } = renderHook(() =>
      useInCardCatalogItem(CARD_BLUEPRINT_DTO)
    )

    result.current.show(CLICK_EVENT, 'test')

    expect(result.current.isLoggedIn).toEqual(IS_LOGGED_IN)
    expect(SHOW).toHaveBeenCalledWith(CLICK_EVENT, 'test')
  })

  it('should run click', () => {
    const { result } = renderHook(() =>
      useInCardCatalogItem(CARD_BLUEPRINT_DTO)
    )

    result.current.click()

    expect(ADD_MY_CARD).toHaveBeenCalledWith({
      cardTraderId: CARD_BLUEPRINT_DTO.cardTraderId,
      name: CARD_BLUEPRINT_DTO.name,
      condition: MyCardCondition.NearMint,
    })
  })
})
