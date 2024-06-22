import { CardTraderMarketplaceProductDto } from '../../../../../src/server/clients/CardTrader/types/CardTraderMarketplaceProductDto'

type MakeMarketplaceProductDtoArgs = {
  blueprintId?: number
  priceCents?: number
  condition?: string | null
}

export const makeMarketplaceProductDto = ({
  blueprintId = 0,
  priceCents = 0,
  condition = null,
}: MakeMarketplaceProductDtoArgs): CardTraderMarketplaceProductDto => {
  const product: CardTraderMarketplaceProductDto = {
    blueprintId,
    price: {
      cents: priceCents,
    },
    propertiesHash: {
      condition,
    },
  }

  return product
}
