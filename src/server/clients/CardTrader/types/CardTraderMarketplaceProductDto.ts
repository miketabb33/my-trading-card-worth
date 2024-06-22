export type CardTraderMarketplaceProductDto = {
  blueprintId: number
  price: CardTraderMarketplaceProductDtoPrice
  propertiesHash: CardTraderMarketplaceProductDtoPropertyHash
}

export type CardTraderMarketplaceProductDtoPrice = {
  cents: number
}

export type CardTraderMarketplaceProductDtoPropertyHash = {
  condition: string | null
}
