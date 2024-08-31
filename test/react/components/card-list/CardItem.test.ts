import { renderHook } from '@testing-library/react'
import { useInCardItem } from '../../../../src/react/components/card-list/CardItem'
import * as ProfileProviderModule from '../../../../src/react/providers/ProfileProvider'
import { PROFILE_CONTEXT_TYPE } from '../../__MOCKS__/profileContextType.mock'
import * as GlobalPopupProviderModule from '../../../../src/react/providers/GlobalPopupProvider'
import { GLOBAL_CONTEXT_POPUP_CONTEXT } from '../../__MOCKS__/globalPopupContextType.mock'
import { CLICK_EVENT } from '../../__MOCKS__/clickEvent.mock'
import { CARD_DTO } from '../../../core/__MOCKS__/cardDto.mock'
import { CardDto } from '../../../../src/core/types/CardDto'

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

describe('Use In Card Item', () => {
  it('should return values', () => {
    const dto: CardDto = {
      ...CARD_DTO,
      medianMarketValueCents: 300,
    }
    const { result } = renderHook(() => useInCardItem(dto, true))

    result.current.openEnlargedImage(CLICK_EVENT, 'test')

    expect(result.current.isLoggedIn).toEqual(IS_LOGGED_IN)
    expect(result.current.formattedMedian).toEqual('$3.00')
    expect(SHOW).toHaveBeenCalledWith(CLICK_EVENT, 'test')
  })

  describe('Show Owned Count', () => {
    it('should show when is editable and logged in', () => {
      const isLoggedIn = true
      const isEditable = true

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showOwnedCount).toEqual(true)
    })
    it('should NOT show when is editable and NOT logged in', () => {
      const isLoggedIn = false
      const isEditable = true

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showOwnedCount).toEqual(false)
    })
    it('should show when is NOT editable and logged in', () => {
      const isLoggedIn = true
      const isEditable = false

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showOwnedCount).toEqual(true)
    })
    it('should show when is NOT editable and NOT logged in', () => {
      const isLoggedIn = false
      const isEditable = false

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showOwnedCount).toEqual(true)
    })
  })

  describe('Show Actions', () => {
    it('should show when is editable and logged in', () => {
      const isLoggedIn = true
      const isEditable = true

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showActions).toEqual(true)
    })
    it('should NOT show when is editable and NOT logged in', () => {
      const isLoggedIn = false
      const isEditable = true

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showActions).toEqual(false)
    })
    it('should NOT show when is NOT editable and logged in', () => {
      const isLoggedIn = true
      const isEditable = false

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showActions).toEqual(false)
    })
    it('should NOT show when is NOT editable and NOT logged in', () => {
      const isLoggedIn = false
      const isEditable = false

      USE_PROFILE.mockReturnValue({
        ...PROFILE_CONTEXT_TYPE,
        isLoggedIn: isLoggedIn,
      })

      const { result } = renderHook(() => useInCardItem(CARD_DTO, isEditable))

      expect(result.current.showActions).toEqual(false)
    })
  })
})
