import React from 'react'
import styled from 'styled-components'
import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import CardCatalogPopup from './CardCatalogPopup'
import { useProfile } from '../../providers/ProfileProvider'
import AddCardButton from './card-button/AddCardButton'
import { MyCardCondition } from '../../../core/types/MyCardCondition'
import { formatCentsToDollars } from '../../../core/CurrencyFormatters'
import RemoveCardButton from './card-button/RemoveCardButton'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`

const Image = styled.img`
  cursor: pointer;
`

const ContentWell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const LoggedInContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PriceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
`

const Detail = styled.p`
  margin-left: 0.8rem;
`

const Actions = styled.div`
  display: flex;
`

type CardCatalogItemProps = {
  blueprint: CardBlueprintDto
  refreshBlueprints: () => void
}

const CardCatalogItem = ({
  blueprint,
  refreshBlueprints,
}: CardCatalogItemProps) => {
  const { isLoggedIn, mixMaxValue, formattedAvg, formattedMedian, show } =
    useInCardCatalogItem(blueprint)

  return (
    <Container>
      <Image
        src={blueprint.imageUrlPreview}
        onClick={(e) =>
          show(e, <CardCatalogPopup imageUrl={blueprint.imageUrlShow} />)
        }
      />
      <ContentWell>
        <Line />
        <h2>{blueprint.name}</h2>
        <Line />
        <PriceContent>
          <h3>Price:</h3>
          <Detail>Min-Max: {mixMaxValue}</Detail>
          <Detail>Average Value: {formattedAvg}</Detail>
          <Detail>Median Value: {formattedMedian}</Detail>
        </PriceContent>
        {isLoggedIn && (
          <LoggedInContent>
            <h3>Your Collection:</h3>
            <Detail>Owned: {blueprint.owned}</Detail>
            <Actions>
              <AddCardButton
                blueprint={blueprint}
                condition={MyCardCondition.Unknown}
                refreshBlueprints={refreshBlueprints}
              />
              <RemoveCardButton
                blueprintId={blueprint.cardTraderBlueprintId}
                cardsOwned={blueprint.owned}
                refreshBlueprints={refreshBlueprints}
              />
            </Actions>
          </LoggedInContent>
        )}
      </ContentWell>
    </Container>
  )
}

export const useInCardCatalogItem = (blueprint: CardBlueprintDto) => {
  const { show } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const formatValue = (cents: number) => {
    if (cents < 0) return '...'
    return formatCentsToDollars(cents)
  }

  const formattedMin = formatValue(blueprint.minMarketValueCents)
  const formattedMax = formatValue(blueprint.maxMarketValueCents)
  const formattedAvg = formatValue(blueprint.averageMarketValueCents)
  const formattedMedian = formatValue(blueprint.medianMarketValueCents)

  const mixMaxValue = `${formattedMin} - ${formattedMax}`

  return {
    isLoggedIn,
    mixMaxValue,
    formattedAvg,
    formattedMedian,
    show,
  }
}

export default CardCatalogItem
