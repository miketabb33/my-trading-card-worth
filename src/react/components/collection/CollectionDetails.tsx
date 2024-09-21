import React from 'react'
import { CollectionMetaDto } from '../../../core/types/CollectionMetaDto'
import styled, { css } from 'styled-components'
import { formatCentsToDollars } from '../../../core/currencyFormatter'
import { tabLandAndUp } from '../../styles/Responsive'
import { formatWithCommas } from '../../../core/numberFormatter'

const Container = styled.div`
  margin-top: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${tabLandAndUp(css`
    align-items: center;
  `)}
`
const Title = styled.h1`
  letter-spacing: 0.25rem;
  font-weight: 300;
`

const Price = styled.span`
  color: ${({ theme }) => theme.staticColor.gray_600};
`

export type CollectionDetailsProps = {
  collectionMeta: CollectionMetaDto
  nameTag: string
}

const CollectionDetails = ({ collectionMeta, nameTag }: CollectionDetailsProps) => {
  const { medianValue, formattedCardsInCollection } = collectionDetailsController(collectionMeta)
  return (
    <Container>
      <Title>
        {nameTag} Collection Value: <Price id="CollectionTotalMedianValue">{medianValue}</Price>
      </Title>
      <p>Cards In Collection: {formattedCardsInCollection}</p>
    </Container>
  )
}

export const collectionDetailsController = (collectionMeta: CollectionMetaDto) => {
  return {
    medianValue: formatCentsToDollars(collectionMeta.medianMarketValueCents),
    formattedCardsInCollection: formatWithCommas(collectionMeta.cardsInCollection),
  }
}

export default CollectionDetails
