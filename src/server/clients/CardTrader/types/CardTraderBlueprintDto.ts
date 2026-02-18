export type CardTraderBlueprintDto = {
  id: number
  name: string
  version: string | null
  gameId: number
  categoryId: number
  expansionId: number
  fixedProperties: {
    collectorNumber: string
    pokemonRarity: string
  }
  image: {
    show: {
      url: string
    }
    preview: {
      url: string
    }
  }
}
