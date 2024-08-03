import React from 'react'
import PageDetailsLayout from '../base/layout/PageDetailsLayout'
import { MyCollectionDetailsDto } from '../../../core/types/MyCollectionDetailsDto'
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
  details: MyCollectionDetailsDto
}

const CollectionDetails = ({ details }: CollectionDetailsProps) => {
  const { minMaxValue, averageValue, medianValue } =
    collectionDetailsController(details)
  return (
    <PageDetailsLayout
      header={
        <Header>
          <h1>Collection Value:</h1>
        </Header>
      }
      content={
        <Row>
          <Item>Min-Max: {minMaxValue}</Item>
          <Item>Median: {medianValue}</Item>
          <Item>Average: {averageValue}</Item>
        </Row>
      }
    />
  )
}

export const collectionDetailsController = (
  details: MyCollectionDetailsDto
) => {
  const minValue = formatCentsToDollars(details.minMarketValueCents)
  const maxValue = formatCentsToDollars(details.maxMarketValueCents)
  return {
    minMaxValue: `${minValue}-${maxValue}`,
    averageValue: formatCentsToDollars(details.averageMarketValueCents),
    medianValue: formatCentsToDollars(details.medianMarketValueCents),
  }
}

export default CollectionDetails
