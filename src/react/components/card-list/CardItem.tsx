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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Actions = styled.div`
  display: flex;
`

const Price = styled.span`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.staticColor.gray_600};
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
  const { formattedMedian, showOwnedCount, showActions, openEnlargedImage } =
    useInCardItem(cardDto, isEditable)

  return (
    <Container id={id}>
      <Image
        src={cardDto.imageUrlPreview}
        onClick={(e) =>
          openEnlargedImage(
            e,
            <EnlargedCardPopup imageUrl={cardDto.imageUrlShow} />
          )
        }
      />
      <ContentWell>
        <Line />
        <h2>{cardDto.name}</h2>
        <Line />
        <Details>
          <h3>
            Value: <Price>{formattedMedian}</Price>
          </h3>

          <>
            {showOwnedCount && <h3>Owned: {cardDto.owned}</h3>}
            {showActions && (
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
            )}
          </>
        </Details>
      </ContentWell>
    </Container>
  )
}

export const useInCardItem = (cardDto: CardDto, isEditable: boolean) => {
  const { show: openEnlargedImage } = useGlobalPopup()
  const { isLoggedIn } = useProfile()

  const formatValue = (cents: number) => {
    if (cents < 0) return '...'
    return formatCentsToDollars(cents)
  }

  const formattedMedian = formatValue(cardDto.medianMarketValueCents)

  return {
    isLoggedIn,
    formattedMedian,
    showOwnedCount: isLoggedIn || !isEditable,
    showActions: isLoggedIn && isEditable,
    openEnlargedImage,
  }
}

export default CardItem
