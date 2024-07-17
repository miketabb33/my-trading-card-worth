import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import { CardDto } from '../../../core/types/CardDto'
import Input, { useWithInput } from '../base/form/Input'
import { CenterContent } from '../Layout'
import { Button } from '../base/Button'
import { UseEffectType } from '../../types/UseEffectType'

const CardContainer = styled.div`
  display: grid;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

const SearchBarContainer = styled.div`
  max-width: 45rem;
`

const CardsHeader = styled.h1`
  margin-top: 2rem;
`

const SearchBarControls = styled.div`
  display: flex;
`

const InputContainer = styled.div`
  flex: 1;
`

export type CardListProps = {
  cardsDto: CardDto[]
  refreshCards: () => void
}

const CardList = ({ cardsDto, refreshCards }: CardListProps) => {
  const {
    filteredCardsDto,
    inputBind,
    showSearchBar,
    showNoCardsMatchingFilter,
    showCardsTitle,
    cardsWillChangeEffect,
    clearInput,
  } = useInCardList(cardsDto)

  useEffect(cardsWillChangeEffect.effect, cardsWillChangeEffect.deps)

  return (
    <>
      {showCardsTitle && <CardsHeader>Cards:</CardsHeader>}
      {showSearchBar && (
        <SearchBarContainer>
          <p>Search By Name:</p>
          <SearchBarControls>
            <InputContainer>
              <Input {...inputBind} />
            </InputContainer>
            <Button onClick={clearInput}>Clear</Button>
          </SearchBarControls>
        </SearchBarContainer>
      )}

      {showNoCardsMatchingFilter && (
        <CenterContent>
          <h1>No Matching Cards</h1>
          <p>Try searching something else.</p>
        </CenterContent>
      )}

      <CardContainer>
        {filteredCardsDto.map((cardDto) => (
          <CardItem
            key={cardDto.blueprintId}
            cardDto={cardDto}
            refreshCards={refreshCards}
          />
        ))}
      </CardContainer>
    </>
  )
}

export const useInCardList = (cardsDto: CardDto[]) => {
  const input = useWithInput({})
  const [filteredCardsDto, setFilteredCardsDto] = useState<CardDto[]>([])

  const filterCards = () => {
    return cardsDto.filter((cardDto) => {
      const downcaseValue = input.value.toLowerCase()
      const downcaseName = cardDto.name.toLowerCase()
      return downcaseName.includes(downcaseValue)
    })
  }

  const cardsWillChangeEffect: UseEffectType = {
    effect: () => setFilteredCardsDto(filterCards()),
    deps: [cardsDto, input.value],
  }

  const cardsExist = cardsDto.length > 0

  return {
    filteredCardsDto,
    inputBind: input.bind,
    showSearchBar: cardsExist,
    showNoCardsMatchingFilter: cardsExist && filteredCardsDto.length === 0,
    showCardsTitle: cardsExist,
    cardsWillChangeEffect,
    clearInput: () => input.setValue(''),
  }
}

export default CardList
