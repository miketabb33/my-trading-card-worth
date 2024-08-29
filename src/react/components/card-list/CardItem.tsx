import React from 'react'
import styled from 'styled-components'
import { useGlobalPopup } from '../../providers/GlobalPopupProvider'
import EnlargedCardPopup from './EnlargedCardPopup'
import { useProfile } from '../../providers/ProfileProvider'
import AddCardButton from './card-button/AddCardButton'
import { CardConditions } from '../../../core/types/CardCondition'
import { formatCentsToDollars } from '../../../core/CurrencyFormatters'
import RemoveCardButton from './card-button/RemoveCardButton'
import { CardDto } from '../../../core/types/CardDto'
import { Line } from '../base/Line'

const Container = styled.div`
  display: flex;
  gap: 1rem;
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

const Detail = styled.p`
  margin-left: 0.8rem;
`

const Actions = styled.div`
  display: flex;
`

type CardItemProps = {
  cardDto: CardDto
  id?: string
  isEditable?: boolean
  refreshCards?: (() => void) | undefined
}

const CardItem = ({
  cardDto,
  id,
  isEditable = true,
  refreshCards = () => {},
}: CardItemProps) => {
  const { isLoggedIn, formattedMedian, show } = useInCardItem(cardDto)

  return (
    <Container id={id}>
      <Image
        src={cardDto.imageUrlPreview}
        onClick={(e) =>
          show(e, <EnlargedCardPopup imageUrl={cardDto.imageUrlShow} />)
        }
      />
      <ContentWell>
        <Line />
        <h2>{cardDto.name}</h2>
        <Line />
        <PriceContent>
          <h3>Price:</h3>
          <Detail>Median Value: {formattedMedian}</Detail>
        </PriceContent>
        {isLoggedIn && isEditable && (
          <LoggedInContent>
            <h3>Your Collection:</h3>
            <Detail>Owned: {cardDto.owned}</Detail>
            <Actions>
              <AddCardButton
                cardDto={cardDto}
                condition={CardConditions.Unknown}
                refreshCards={refreshCards}
              />
              <RemoveCardButton
                blueprintId={cardDto.blueprintId}
                cardsOwned={cardDto.owned}
                refreshCards={refreshCards}
              />
            </Actions>
          </LoggedInContent>
        )}
      </ContentWell>
    </Container>
  )
}

export const useInCardItem = (cardDto: CardDto) => {
  const { show } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const formatValue = (cents: number) => {
    if (cents < 0) return '...'
    return formatCentsToDollars(cents)
  }

  const formattedMedian = formatValue(cardDto.medianMarketValueCents)

  return {
    isLoggedIn,
    formattedMedian,
    show,
  }
}

export default CardItem
