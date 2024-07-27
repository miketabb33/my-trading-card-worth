import React from 'react'
import styled, { css } from 'styled-components'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import PageDetailsLayout from '../PageDetailsLayout'
import { DetailsRowItem, PriceRowItem, RowItemProps } from './RowItem'
import { ExpansionPriceDetailsDto } from '../../../core/types/ExpansionPriceDetailsDto'
import { desktopAndUp, tabLandAndUp } from '../../styles/Responsive'

const imageWidth = '20rem'

const Grid = styled.div`
  display: grid;
  column-gap: 2rem;
  row-gap: 2rem;

  ${tabLandAndUp(css`
    grid-template-columns: 1fr 1fr;
  `)}

  ${desktopAndUp(css`
    grid-template-columns: 1fr ${imageWidth} 1fr;
  `)}
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const LogoContainer = styled(ContentContainer)`
  justify-self: center;

  ${tabLandAndUp(css`
    grid-column: 1 / 3;
  `)}

  ${desktopAndUp(css`
    grid-column: 2 / 3;
  `)}
`

const Details = styled(ContentContainer)`
  ${tabLandAndUp(css`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  `)}
  ${desktopAndUp(css`
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  `)}
`

const Prices = styled(ContentContainer)`
  ${tabLandAndUp(css`
    grid-row: 2 / 3;
    grid-column: 1 / 2;

    justify-self: self-end;
    align-items: end;
  `)}

  ${desktopAndUp(css`
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  `)}
`

const Logo = styled.img`
  width: ${imageWidth};
`

const Symbol = styled.img`
  object-fit: contain;
`

type CatalogExpansionDetailsProps = {
  expansionDetailsDto: ExpansionDetailsDto
}

const CatalogExpansionDetails = ({
  expansionDetailsDto: details,
}: CatalogExpansionDetailsProps) => {
  const { detailsRowItems, priceRowItems } =
    catalogExpansionDetailsController(details)

  return (
    <PageDetailsLayout
      header={
        <>
          {details.symbolUrl && <Symbol src={details.symbolUrl} />}
          <h1>{details.name} Expansion</h1>
        </>
      }
      content={
        <Grid>
          <LogoContainer>
            {details.logoUrl && <Logo src={details.logoUrl}></Logo>}
          </LogoContainer>

          <Details>
            <h2>Details</h2>
            {detailsRowItems.map((item) => (
              <DetailsRowItem key={item.title} {...item} />
            ))}
            <a href={details.bulbapediaUrl} target="_blank" rel="noreferrer">
              See on Bulbapedia
            </a>
          </Details>
          {!!priceRowItems && (
            <Prices>
              <h2>Prices</h2>
              {priceRowItems.map((item) => (
                <PriceRowItem key={item.title} {...item} />
              ))}
            </Prices>
          )}
        </Grid>
      }
    />
  )
}

export const catalogExpansionDetailsController = (
  details: ExpansionDetailsDto
) => {
  const detailsRowItems = buildDetailsRowItems(details)
  const priceRowItems = details.priceDetails
    ? buildPriceRowItems(details.priceDetails)
    : null

  return {
    detailsRowItems,
    priceRowItems,
  }
}

const buildDetailsRowItems = (details: ExpansionDetailsDto) => {
  const detailsRowItems: RowItemProps[] = []
  detailsRowItems.push({ title: 'Release Date:', value: details.releaseDate })
  detailsRowItems.push({ title: 'Number Of Cards:', value: details.cardCount })
  if (details.secretCardCount > 0)
    detailsRowItems.push({
      title: 'Number Of Secret Card:',
      value: details.secretCardCount,
    })
  detailsRowItems.push({
    title: 'Series:',
    value: (
      <>
        {details.series} <i>(expansion number {details.expansionNumber})</i>{' '}
      </>
    ),
  })
  return detailsRowItems
}

const buildPriceRowItems = (priceDetails: ExpansionPriceDetailsDto) => {
  const priceRowItems: RowItemProps[] = [
    { title: '$200.00+', value: priceDetails.twoHundredPlus },
    { title: '$100.01-$200.00', value: priceDetails.oneHundredTwoHundred },
    { title: '$50.01-$100.00', value: priceDetails.fiftyToOneHundred },
    { title: '$0.00-$50.00', value: priceDetails.zeroToFifty },
  ]

  return priceRowItems
}

export default CatalogExpansionDetails
