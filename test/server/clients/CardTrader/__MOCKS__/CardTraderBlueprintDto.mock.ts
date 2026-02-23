import { CardTraderBlueprintDto } from '../../../../../src/server/clients/CardTrader/parseBlueprints'

export const makeBlueprintDto = (overrides: Partial<CardTraderBlueprintDto> = {}): CardTraderBlueprintDto => ({
  id: 1,
  name: 'any',
  version: '',
  gameId: 0,
  categoryId: 0,
  expansionId: 0,
  fixedProperties: { collectorNumber: '', pokemonRarity: 'Common' },
  image: { show: { url: '' }, preview: { url: '' } },
  ...overrides,
})
