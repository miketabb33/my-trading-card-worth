import React from 'react'
import PageDetailsLayout from '../base/layout/PageDetailsLayout'
import { CollectionMetaDto } from '../../../core/types/CollectionMetaDto'
import styled, { css } from 'styled-components'
import { formatCentsToDollars } from '../../../core/CurrencyFormatters'
import { tabLandAndUp } from '../../styles/Responsive'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${tabLandAndUp(css`
    gap: 8rem;
    flex-direction: row;
    font-size: 2rem;
  `)};
`

const Header = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

const Item = styled.h3``

export type CollectionDetailsProps = {
  collectionMeta: CollectionMetaDto
}

const CollectionDetails = ({ collectionMeta }: CollectionDetailsProps) => {
  const { medianValue } = collectionDetailsController(collectionMeta)
  return (
    <PageDetailsLayout
      header={
        <Header>
          <h1>Collection Value:</h1>
        </Header>
      }
      content={
        <Row>
          <Item id="CollectionTotalMedianValue">Median: {medianValue}</Item>
        </Row>
      }
    />
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
