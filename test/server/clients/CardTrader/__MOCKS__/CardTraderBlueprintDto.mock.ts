import { CardTraderBlueprintDto } from '../../../../../src/server/clients/CardTrader/types/CardTraderBlueprintDto'

type MakeBlueprintDto = {
  id?: number
  name?: string
  version?: string
  collectorNumber?: string
  pokemonRarity?: string
  imageUrlPreview?: string
  imageUrlShow?: string
  categoryId?: number
}

export const makeBlueprintDto = ({
  id = 1,
  name = 'any',
  version = '',
  collectorNumber = '',
  pokemonRarity = 'Common',
  imageUrlPreview = '',
  imageUrlShow = '',
  categoryId = 0,
}: MakeBlueprintDto): CardTraderBlueprintDto => ({
  id,
  name,
  version,
  gameId: 0,
  categoryId,
  expansionId: 0,
  fixedProperties: {
    collectorNumber,
    pokemonRarity,
  },
  image: {
    show: {
      url: imageUrlShow,
    },
    preview: {
      url: imageUrlPreview,
    },
  },
})
