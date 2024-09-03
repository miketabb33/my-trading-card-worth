import React from 'react'
import { CollectionMetaDto } from '../../../core/types/CollectionMetaDto'
import styled from 'styled-components'
import { formatCentsToDollars } from '../../../core/CurrencyFormatters'

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

const CollectionDetails = ({
  collectionMeta,
  nameTag,
}: CollectionDetailsProps) => {
  const { medianValue } = collectionDetailsController(collectionMeta)
  return (
    <Container>
      <Title>
        {nameTag} Collection Value:{' '}
        <Price id="CollectionTotalMedianValue">{medianValue}</Price>
      </Title>
    </Container>
  )
}

export const collectionDetailsController = (
  collectionMeta: CollectionMetaDto
) => {
  return {
    medianValue: formatCentsToDollars(collectionMeta.medianMarketValueCents),
  }
}

export default CollectionDetails
