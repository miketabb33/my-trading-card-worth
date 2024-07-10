import styled, { css } from 'styled-components'
import { tabLandAndUp } from '../styles/Responsive'
import React from 'react'
import CardCatalogItem from './card-catalog/CardCatalogItem'
import { CardBlueprintDto } from '../../core/types/CardBlueprintDto'

const Catalog = styled.div`
  display: grid;

  ${tabLandAndUp(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`

type BlueprintListProps = {
  blueprints: CardBlueprintDto[]
  refreshBlueprints: () => void
}

const BlueprintList = ({
  blueprints,
  refreshBlueprints,
}: BlueprintListProps) => {
  return (
    <Catalog>
      {blueprints.map((blueprint) => (
        <CardCatalogItem
          key={blueprint.cardTraderBlueprintId}
          blueprint={blueprint}
          refreshBlueprints={refreshBlueprints}
        />
      ))}
    </Catalog>
  )
}

export default BlueprintList
