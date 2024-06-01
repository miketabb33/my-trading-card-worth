import { renderHook } from '@testing-library/react'
import { useInCardCatalogItem } from '../../../../src/react/components/card-catalog/CardCatalogItem'
import * as ProfileProviderModule from '../../../../src/react/providers/ProfileProvider'
import { PROFILE_CONTEXT_TYPE } from '../../../__MOCKS__/profileContextType.mock'
import * as GlobalPopupProviderModule from '../../../../src/react/providers/GlobalPopupProvider'
import { GLOBAL_CONTEXT_POPUP_CONTEXT } from '../../../__MOCKS__/globalPopupContextType.mock'
import { CLICK_EVENT } from '../../../__MOCKS__/clickEvent.mock'

const USE_PROFILE = jest.spyOn(ProfileProviderModule, 'useProfile')
const USE_GLOBAL_POPUP = jest.spyOn(GlobalPopupProviderModule, 'useGlobalPopup')

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

describe('Use In Card Catalog Item', () => {
  it('should return values', () => {
    const { result } = renderHook(() => useInCardCatalogItem())

    result.current.show(CLICK_EVENT, 'test')

    expect(result.current.isLoggedIn).toEqual(IS_LOGGED_IN)
    expect(SHOW).toHaveBeenCalledWith(CLICK_EVENT, 'test')
  })
})
