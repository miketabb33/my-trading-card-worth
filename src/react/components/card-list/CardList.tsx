import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import React from 'react'
import CardItem from './CardItem'
import { CardDto } from '../../../core/types/CardDto'

const Container = styled.div`
  display: grid;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

type BlueprintListProps = {
  cardsDto: CardDto[]
  refreshCards: () => void
}

const CardList = ({ cardsDto, refreshCards }: BlueprintListProps) => {
  return (
    <Container>
      {cardsDto.map((cardDto) => (
        <CardItem
          key={cardDto.blueprintId}
          cardDto={cardDto}
          refreshCards={refreshCards}
        />
      ))}
    </Container>
  )
}

export default CardList
