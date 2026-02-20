import React from 'react'
import styled, { css } from 'styled-components'
import { ExpansionDetailsDto } from '../../../core/types/ExpansionDetailsDto'
import PageDetailsLayout from '../base/layout/PageDetailsLayout'
import { DetailsRowItem, PriceRowItem, RowItemProps } from './RowItem'
import { ExpansionPriceDetailsDto } from '../../../core/types/ExpansionPriceDetailsDto'
import { desktopAndUp, tabLandAndUp } from '../../styles/Responsive'
import ExternalTextLink from '../base/text-link/ExternalTextLink'

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
  width: 4rem;
  height: auto;
  flex-shrink: 0;
`

type CatalogExpansionDetailsProps = {
  expansionDetailsDto: ExpansionDetailsDto
}

const CatalogExpansionDetails = ({ expansionDetailsDto: details }: CatalogExpansionDetailsProps) => {
  const { detailsRowItems, priceRowItems } = catalogExpansionDetailsController(details)
  const fallbackLogo =
    'https://archives.bulbagarden.net/media/upload/archive/6/62/20100514003048%21Pok%C3%A9mon_TCG_logo.png'

  return (
    <PageDetailsLayout
      header={
        <>
          {details.symbolUrl && <Symbol src={details.symbolUrl} />}
          <h1 id="ExpansionTitle">{details.name} Expansion</h1>
        </>
      }
      content={
        <Grid>
          <LogoContainer>
            <Logo src={details.logoUrl ?? fallbackLogo} />
          </LogoContainer>

          <Details>
            <h2>Details</h2>
            {detailsRowItems.map((item) => (
              <DetailsRowItem key={item.title} {...item} />
            ))}
            {details.bulbapediaUrl && (
              <ExternalTextLink href={details.bulbapediaUrl}>See on Bulbapedia</ExternalTextLink>
            )}
          </Details>
          <Prices>
            <h2>Prices</h2>
            {priceRowItems.map((item) => (
              <PriceRowItem key={item.title} {...item} />
            ))}
          </Prices>
        </Grid>
      }
    />
  )
}

export const catalogExpansionDetailsController = (details: ExpansionDetailsDto) => {
  const detailsRowItems = buildDetailsRowItems(details)
  const priceRowItems = buildPriceRowItems(details.priceDetails)

  return {
    detailsRowItems,
    priceRowItems,
  }
}

const buildDetailsRowItems = (details: ExpansionDetailsDto) => {
  const detailsRowItems: RowItemProps[] = []
  if (details.releaseDate) detailsRowItems.push({ title: 'Release Date:', value: details.releaseDate })
  if (details.cardCount) detailsRowItems.push({ title: 'Number Of Cards:', value: details.cardCount })
  if (details.secretCardCount > 0)
    detailsRowItems.push({
      title: 'Number Of Secret Card:',
      value: details.secretCardCount,
    })
  if (details.series)
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
    { title: '$100.00-$199.99', value: priceDetails.oneHundredTwoHundred },
    { title: '$50.00-$99.99', value: priceDetails.fiftyToOneHundred },
    { title: '$0.01-$49.99', value: priceDetails.zeroToFifty },
  ]

  return priceRowItems
}

export default CatalogExpansionDetails
