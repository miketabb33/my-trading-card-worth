import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import PageDetailsLayout from '../PageDetailsLayout'

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Row = styled.div`
  display: flex;
  gap: 1rem;
`

type CatalogExpansionDetailsProps = {
  expansionDetailsDto: ExpansionDetailsDto
}

const CatalogExpansionDetails = ({
  expansionDetailsDto: details,
}: CatalogExpansionDetailsProps) => {
  return (
    <PageDetailsLayout
      header={
        <>
          {details.symbolUrl && <img src={details.symbolUrl} />}
          <h1>{details.name} Expansion</h1>
        </>
      }
      content={
        <>
          <Side>{details.logoUrl && <img src={details.logoUrl}></img>}</Side>
          <Side>
            <RowItem title="Release Date:" value={details.releaseDate} />
            <RowItem title="Number Of Cards:" value={details.cardCount} />
            {details.secretCardCount > 0 && (
              <RowItem
                title="Number Of Secret Card:"
                value={details.secretCardCount}
              />
            )}
            <RowItem
              title="Series:"
              value={
                <>
                  {details.series}{' '}
                  <i>(expansion number {details.expansionNumber})</i>
                </>
              }
            />
            <a href={details.bulbapediaUrl} target="_blank" rel="noreferrer">
              See on Bulbapedia
            </a>
          </Side>
        </>
      }
    />
  )
}

type RowItemProps = {
  title: string
  value: ReactNode
}

const RowItem = ({ title, value }: RowItemProps) => {
  return (
    <Row>
      <strong>{title}</strong>
      <p>{value}</p>
    </Row>
  )
}

export default CatalogExpansionDetails