import { CardBlueprint } from '../../../src/server/types/CardBlueprint'

type MakeCardBlueprintMockArgs = {
  blueprintId?: number
  expansionId?: number
  name?: string
  version?: string
  collectorNumber?: string
  pokemonRarity?: string
  imageUrlShow?: string
  imageUrlPreview?: string
}

export const makeCardBlueprintMock = ({
  blueprintId = 1,
  expansionId = 2,
  name = 'name',
  version = 'version',
  collectorNumber = '',
  pokemonRarity = 'Common',
  imageUrlPreview = 'image url preview',
  imageUrlShow = 'image url show',
}: MakeCardBlueprintMockArgs): CardBlueprint => ({
  blueprintId,
  expansionId,
  name,
  version,
  collectorNumber,
  pokemonRarity,
  imageUrlShow,
  imageUrlPreview,
})
