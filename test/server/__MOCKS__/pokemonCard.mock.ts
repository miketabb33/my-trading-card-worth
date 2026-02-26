import PokemonCard from '../../../src/server/domain/PokemonCard'

type MakePokemonCardMockArgs = {
  blueprintId?: number
  expansionId?: number
  name?: string
  collectorNumber?: string
  pokemonRarity?: string
  imageUrlPreview?: string
  imageUrlShow?: string
}

export const makePokemonCardMock = ({
  blueprintId = 1,
  expansionId = 2,
  name = 'name',
  collectorNumber = '',
  pokemonRarity = 'Common',
  imageUrlPreview = 'image url preview',
  imageUrlShow = 'image url show',
}: MakePokemonCardMockArgs = {}): PokemonCard =>
  new PokemonCard({
    cardTraderBlueprintId: blueprintId,
    cardTraderExpansionId: expansionId,
    name,
    collectorNumber,
    pokemonRarity,
    imageUrlPreview,
    imageUrlShow,
  })
