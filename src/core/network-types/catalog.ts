import { CardDto } from './card'

export type ExpansionPriceDetailsDto = {
  zeroToFifty: number
  fiftyToOneHundred: number
  oneHundredTwoHundred: number
  twoHundredPlus: number
}

export type ExpansionDetailsDto = {
  name: string
  expansionNumber: number
  series: string
  cardCount: number
  secretCardCount: number
  releaseDate: string
  logoUrl: string | null
  symbolUrl: string | null
  bulbapediaUrl: string
  priceDetails: ExpansionPriceDetailsDto
}

export type ExpansionDto = {
  expansionId: number
  name: string
  symbol: string | null
  slug: string
}

export type CatalogDto = {
  details: ExpansionDetailsDto | null
  cards: CardDto[]
}
