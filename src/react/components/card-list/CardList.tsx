import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../../styles/Responsive'
import React from 'react'
import CardItem from './CardItem'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'

const Container = styled.div`
  display: grid;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

type BlueprintListProps = {
  blueprints: CardBlueprintDto[]
  refreshBlueprints: () => void
}

const CardList = ({ blueprints, refreshBlueprints }: BlueprintListProps) => {
  return (
    <Container>
      {blueprints.map((blueprint) => (
        <CardItem
          key={blueprint.cardTraderBlueprintId}
          blueprint={blueprint}
          refreshBlueprints={refreshBlueprints}
        />
      ))}
    </Container>
  )
}

export default CardList
