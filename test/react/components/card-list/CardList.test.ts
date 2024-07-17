/* eslint-disable @typescript-eslint/await-thenable */
import { renderHook } from '@testing-library/react'
import { CardDto } from '../../../../src/core/types/CardDto'
import { useInCardList } from '../../../../src/react/components/card-list/CardList'
import { CARD_DTO } from '../../../core/__MOCKS__/cardDto.mock'
import * as InputModule from '../../../../src/react/components/base/form/Input'
import { USE_WITH_INPUT_RETURN } from '../../__MOCKS__/useWithInputReturn.mock'
import { act } from 'react'

const USE_WITH_INPUT = jest.spyOn(InputModule, 'useWithInput')

const CARD_1 = { ...CARD_DTO, name: 'charmander' }
const CARD_2 = { ...CARD_DTO, name: 'pikachu' }
const CARD_3 = { ...CARD_DTO, name: 'cHaRiZard' }
const CARD_4 = { ...CARD_DTO, name: 'pidgy' }
const CARD_5 = { ...CARD_DTO, name: 'Giovannis Charisma' }

const CARDS = [CARD_1, CARD_2, CARD_3, CARD_4, CARD_5]

describe('Use In Card List', () => {
  it('should show searchbar when cards exist', () => {
    const cardDto = Array(9).fill(CARD_DTO) as CardDto[]
    const { result } = renderHook(() => useInCardList(cardDto))

    expect(result.current.showSearchBar).toEqual(true)
  })

  it('should NOT show searchbar when no cards exist', () => {
    const { result } = renderHook(() => useInCardList([]))

    expect(result.current.showSearchBar).toEqual(false)
  })

  it('should show "no cards matching filter" when cards exist but none match filter', async () => {
    USE_WITH_INPUT.mockReturnValue({
      ...USE_WITH_INPUT_RETURN,
      value: 'non-matching',
    })
    const cardDto = Array(7).fill(CARD_DTO) as CardDto[]

    const { result } = renderHook(() => useInCardList(cardDto))

    await act(async () => await result.current.cardsWillChangeEffect.effect())

    expect(result.current.showNoCardsMatchingFilter).toEqual(true)
  })

  it('should NOT show "no cards match filter" when cards match filter', async () => {
    USE_WITH_INPUT.mockReturnValue({
      ...USE_WITH_INPUT_RETURN,
      value: 'match',
    })
    const cardDto = Array(7).fill(CARD_DTO) as CardDto[]

    cardDto[0].name = 'match'

    const { result } = renderHook(() => useInCardList(cardDto))

    await act(async () => await result.current.cardsWillChangeEffect.effect())

    expect(result.current.showNoCardsMatchingFilter).toEqual(false)
  })

  it('should show "cards title" when cards dto have cards', () => {
    const cardDto = Array(7).fill(CARD_DTO) as CardDto[]

    const { result } = renderHook(() => useInCardList(cardDto))

    expect(result.current.showCardsTitle).toEqual(true)
  })

  it('should NOT show "cards title" when cards dto does NOT have cards', () => {
    const { result } = renderHook(() => useInCardList([]))

    expect(result.current.showCardsTitle).toEqual(false)
  })

  it('should filter cards when input has a value', async () => {
    USE_WITH_INPUT.mockReturnValue({
      ...USE_WITH_INPUT_RETURN,
      value: 'char',
    })

    const { result } = renderHook(() => useInCardList(CARDS))

    await act(async () => await result.current.cardsWillChangeEffect.effect())

    expect(result.current.filteredCardsDto.length).toEqual(3)
    expect(result.current.filteredCardsDto[0].name).toEqual(CARD_1.name)
    expect(result.current.filteredCardsDto[1].name).toEqual(CARD_3.name)
    expect(result.current.filteredCardsDto[2].name).toEqual(CARD_5.name)
  })

  it('should NOT filter cards when input is blank', async () => {
    USE_WITH_INPUT.mockReturnValue({
      ...USE_WITH_INPUT_RETURN,
      value: '',
    })

    const { result } = renderHook(() => useInCardList(CARDS))

    await act(async () => await result.current.cardsWillChangeEffect.effect())

    expect(result.current.filteredCardsDto.length).toEqual(CARDS.length)
  })

  it('clear input', () => {
    const CLEAR_INPUT = jest.fn()
    USE_WITH_INPUT.mockReturnValue({
      ...USE_WITH_INPUT_RETURN,
      setValue: CLEAR_INPUT,
    })

    const { result } = renderHook(() => useInCardList(CARDS))

    act(result.current.clearInput)

    expect(CLEAR_INPUT).toHaveBeenCalled()
  })
})
