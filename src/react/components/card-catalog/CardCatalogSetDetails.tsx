import React, { ReactNode } from 'react'
import { SetDetailsDto } from '../../../core/types/CardBlueprintDto'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 2rem;
`
const Header = styled.div`
  display: flex;
  gap: 1rem;
`

const Split = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 2rem;
`

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Row = styled.div`
  display: flex;
  gap: 1rem;
`

type CardCatalogSetDetails = {
  details: SetDetailsDto
}

const CardCatalogSetDetails = ({ details }: CardCatalogSetDetails) => {
  return (
    <Container>
      <Header>
        <h1>{details.name} Set</h1>
        {details.symbolUrl && <img src={details.symbolUrl} />}
      </Header>
      <Split>
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
                {details.series} <i>(set number {details.setNumber})</i>
              </>
            }
          />
          <a href={details.bulbapediaUrl} target="_blank" rel="noreferrer">
            See on Bulbapedia
          </a>
        </Side>
      </Split>
    </Container>
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

export default CardCatalogSetDetails
