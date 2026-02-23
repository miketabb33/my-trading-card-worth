/* eslint-disable @typescript-eslint/await-thenable */
import { act, renderHook } from '@testing-library/react'
import { CARD_DTO } from '../../../core/__MOCKS__/cardDto.mock'
import * as MyCardClient from '../../../../src/react/network/collectionClient'
import { useInCollection } from '../../../../src/react/components/collection/Collection'
import { UseApiReturn } from '../../../../src/react/network/useApi'
import { CollectionDto } from '@core/network-types/collection'
import * as ProfileProviderModule from '../../../../src/react/providers/ProfileProvider'
import { PROFILE_CONTEXT_TYPE } from '../../__MOCKS__/profileContextType.mock'
import { COLLECTION_META_DTO } from '../../../core/__MOCKS__/collectionMetaDto.mock'
import { PROFILE_DTO } from '../../../core/__MOCKS__/profileDto.mock'

const CARDS = [CARD_DTO, CARD_DTO]

const COLLECTION_DTO: CollectionDto = {
  cards: CARDS,
  meta: COLLECTION_META_DTO,
}

const REFRESH = jest.fn()
const USE_MY_CARDS = jest.spyOn(MyCardClient, 'useMyCards')

const USE_MY_CARDS_RETURN: UseApiReturn<CollectionDto> = {
  data: null,
  isLoading: false,
  errors: null,
  refresh: REFRESH,
}
USE_MY_CARDS.mockReturnValue(USE_MY_CARDS_RETURN)

const USE_PROFILE = jest.spyOn(ProfileProviderModule, 'useProfile')
USE_PROFILE.mockReturnValue(PROFILE_CONTEXT_TYPE)

beforeEach(jest.clearAllMocks)

describe('Use In Collection', () => {
  it('should init as empty array', () => {
    USE_MY_CARDS.mockReturnValue(USE_MY_CARDS_RETURN)
    const { result } = renderHook(useInCollection)
    expect(result.current.cardListProps.cardsDto).toEqual([])
  })

  it('should return cards when available', () => {
    USE_MY_CARDS.mockReturnValue({
      ...USE_MY_CARDS_RETURN,
      data: COLLECTION_DTO,
    })
    const { result } = renderHook(useInCollection)
    expect(result.current.cardListProps.cardsDto).toEqual(CARDS)
  })

  it('should trigger refresh', () => {
    const { result } = renderHook(useInCollection)
    act(() => {
      if (result.current.cardListProps.refreshCards) result.current.cardListProps.refreshCards()
    })
    expect(REFRESH).toHaveBeenCalled()
  })

  it('should build share link path', () => {
    const USER_ID = '123'
    USE_PROFILE.mockReturnValue({
      ...PROFILE_CONTEXT_TYPE,
      profile: { ...PROFILE_DTO, id: Number(USER_ID) },
    })
    const { result } = renderHook(useInCollection)

    expect(result.current.shareLinkPath).toEqual('/collection/123')
  })

  it('should show not logged in when use is not logged in', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_CONTEXT_TYPE,
      isLoggedIn: false,
      isLoading: false,
    })
    USE_MY_CARDS.mockReturnValue({ ...USE_MY_CARDS_RETURN, isLoading: false })

    const { result } = renderHook(useInCollection)
    expect(result.current.showNotLoggedIn).toEqual(true)
    expect(result.current.showNoCollection).toEqual(false)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showCollection).toEqual(false)
  })

  it('should show no items when user is logged in and NO items exist', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_CONTEXT_TYPE,
      isLoggedIn: true,
      isLoading: false,
    })
    USE_MY_CARDS.mockReturnValue({ ...USE_MY_CARDS_RETURN, isLoading: false })

    const { result } = renderHook(useInCollection)
    expect(result.current.showNotLoggedIn).toEqual(false)
    expect(result.current.showNoCollection).toEqual(true)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showCollection).toEqual(false)
  })

  it('should show loading when data is loading', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_CONTEXT_TYPE,
      isLoggedIn: false,
      isLoading: true,
    })
    USE_MY_CARDS.mockReturnValue({
      ...USE_MY_CARDS_RETURN,
      isLoading: true,
    })

    const { result } = renderHook(useInCollection)
    expect(result.current.showNotLoggedIn).toEqual(false)
    expect(result.current.showNoCollection).toEqual(false)
    expect(result.current.showLoading).toEqual(true)
    expect(result.current.showCollection).toEqual(false)
  })

  it('should show collection', () => {
    USE_PROFILE.mockReturnValue({
      ...PROFILE_CONTEXT_TYPE,
      isLoggedIn: true,
      isLoading: false,
    })
    USE_MY_CARDS.mockReturnValue({
      ...USE_MY_CARDS_RETURN,
      isLoading: false,
      data: COLLECTION_DTO,
    })

    const { result } = renderHook(useInCollection)
    expect(result.current.showNotLoggedIn).toEqual(false)
    expect(result.current.showNoCollection).toEqual(false)
    expect(result.current.showLoading).toEqual(false)
    expect(result.current.showCollection).toEqual(true)
  })
})
