export type SetDto = {
  details: SetDetailsDto | null
  blueprints: CardBlueprintDto[]
}

export type SetDetailsDto = {
  name: string
  setNumber: number
  series: string
  cardCount: number
  secretCardCount: number
  releaseDate: string
  logoUrl: string | null
  symbolUrl: string | null
  bulbapediaUrl: string
}

export type CardBlueprintDto = {
  cardTraderBlueprintId: number
  cardTraderExpansionId: number
  name: string
  version: string
  imageUrlPreview: string
  imageUrlShow: string
  owned: number
  minMarketValueCents: number
  maxMarketValueCents: number
  averageMarketValueCents: number
  medianMarketValueCents: number
}
