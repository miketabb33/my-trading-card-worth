import { CardDto } from '@core/network-types/card'
import { BlueprintValue } from '../types/BlueprintValue'
import UserCardStack from './UserCardStack'

class PokemonCard {
  readonly cardTraderBlueprintId: number
  readonly cardTraderExpansionId: number
  readonly name: string
  readonly collectorNumber: string
  readonly pokemonRarity: string
  readonly imageUrlPreview: string
  readonly imageUrlShow: string

  constructor(data: {
    cardTraderBlueprintId: number
    cardTraderExpansionId: number
    name: string
    collectorNumber: string
    pokemonRarity: string
    imageUrlPreview: string
    imageUrlShow: string
  }) {
    this.cardTraderBlueprintId = data.cardTraderBlueprintId
    this.cardTraderExpansionId = data.cardTraderExpansionId
    this.name = data.name
    this.collectorNumber = data.collectorNumber
    this.pokemonRarity = data.pokemonRarity
    this.imageUrlPreview = data.imageUrlPreview
    this.imageUrlShow = data.imageUrlShow
  }

  toCardDto = (blueprintValues: Map<string, BlueprintValue>, userCardStack?: UserCardStack): CardDto => {
    const blueprintValue = blueprintValues.get(`${this.cardTraderBlueprintId}`)
    return {
      blueprintId: this.cardTraderBlueprintId,
      expansionId: this.cardTraderExpansionId,
      name: this.name,
      imageUrlPreview: this.imageUrlPreview,
      imageUrlShow: this.imageUrlShow,
      owned: userCardStack?.filter(this.cardTraderBlueprintId).length ?? 0,
      medianMarketValueCents: blueprintValue?.medianCents ?? -1,
      listingCount: blueprintValue?.listingCount ?? -1,
    }
  }
}

export default PokemonCard
