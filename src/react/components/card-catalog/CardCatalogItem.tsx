import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

const Image = styled.img``

type CardCatalogItemProps = {
  blueprint: CardBlueprintDto
}

const CardCatalogItem = ({ blueprint }: CardCatalogItemProps) => {
  return (
    <Container>
      <Image src={blueprint.imageUrl} />
      <p>{blueprint.name}</p>
      <p>{blueprint.version}</p>
    </Container>
  )
}

export default CardCatalogItem
