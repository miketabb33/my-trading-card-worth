import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import CardCatalogPopup from './CardCatalogPopup'
import { useProfile } from '../../providers/ProfileProvider'
import AddCardButton from './AddCardButton'
import Select, { useWithSelect } from '../base/form/Select'
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
  const { isLoggedIn, selectBind, condition, show } = useInCardCatalogItem()

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
        {isLoggedIn && (
          <>
            <Select {...selectBind} />
            <AddCardButton blueprint={blueprint} condition={condition} />
          </>
        )}
      </ContentWell>
    </Container>
  )
}

export const useInCardCatalogItem = () => {
  const { show } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const { bind: selectBind, selectedOption } = useWithSelect(
    MyCardCondition.asArray.map((condition) => ({
      data: condition,
      title: condition.title,
    }))
  )

  return { isLoggedIn, selectBind, condition: selectedOption, show }
}

export default CardCatalogItem
