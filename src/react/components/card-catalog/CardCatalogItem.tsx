import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import CardCatalogPopup from './CardCatalogPopup'
import { Button } from '../base/Button'
import { useProfile } from '../../providers/ProfileProvider'
import { addMyCard } from '../../network/myCardClient'
import { MyCardDto } from '../../../core/types/MyCardDto'
import { MyCardCondition } from '../../../core/types/MyCardCondition'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

const Image = styled.img`
  cursor: pointer;
`

const ContentWell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

type CardCatalogItemProps = {
  blueprint: CardBlueprintDto
}

const CardCatalogItem = ({ blueprint }: CardCatalogItemProps) => {
  const { isLoggedIn, show, click } = useInCardCatalogItem(blueprint)

  return (
    <Container>
      <Image
        src={blueprint.imageUrlPreview}
        onClick={(e) =>
          show(e, <CardCatalogPopup imageUrl={blueprint.imageUrlShow} />)
        }
      />
      <ContentWell>
        <h2>{blueprint.name}</h2>
        <p>{blueprint.version}</p>
        {isLoggedIn && <Button onClick={click}>Add Card</Button>}
      </ContentWell>
    </Container>
  )
}

export const useInCardCatalogItem = (blueprint: CardBlueprintDto) => {
  const { show } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const click = () => {
    const dto: MyCardDto = {
      cardTraderId: blueprint.cardTraderId,
      name: blueprint.name,
      condition: MyCardCondition.NearMint,
    }
    addMyCard(dto).catch(console.dir)
  }

  return { show, isLoggedIn, click }
}

export default CardCatalogItem
