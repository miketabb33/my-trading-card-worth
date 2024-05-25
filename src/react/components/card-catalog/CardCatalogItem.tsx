import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

const Image = styled.img`
  cursor: pointer;
`

type CardCatalogItemProps = {
  blueprint: CardBlueprintDto
}

const CardCatalogItem = ({ blueprint }: CardCatalogItemProps) => {
  const { show } = useGlobalPopup()
  return (
    <Container>
      <Image
        src={blueprint.imageUrlPreview}
        onClick={(e) => show(e, <img src={blueprint.imageUrlShow} />)}
      />
      <p>{blueprint.name}</p>
      <p>{blueprint.version}</p>
    </Container>
  )
}

export default CardCatalogItem
