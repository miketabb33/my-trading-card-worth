import { CardTraderMarketplaceProductDto } from '../../../../../src/server/clients/CardTrader/parseMarketplaceProducts'

export const makeMarketplaceProductDto = (
  overrides: Partial<CardTraderMarketplaceProductDto> = {}
): CardTraderMarketplaceProductDto => ({
  blueprintId: 0,
  price: { cents: 0 },
  propertiesHash: { condition: null },
  ...overrides,
})
