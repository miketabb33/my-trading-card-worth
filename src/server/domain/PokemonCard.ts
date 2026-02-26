import { CardDto } from '@core/network-types/card'
import { BlueprintValue } from '../types/BlueprintValue'
import UserCardStack from './UserCardStack'

class PokemonCard {
  readonly blueprintId: number
  readonly expansionId: number
  readonly name: string
  readonly collectorNumber: string
  readonly pokemonRarity: string
  readonly imageUrlPreview: string
  readonly imageUrlShow: string

  constructor(data: {
    blueprintId: number
    expansionId: number
    name: string
    collectorNumber: string
    pokemonRarity: string
    imageUrlPreview: string
    imageUrlShow: string
  }) {
    this.blueprintId = data.blueprintId
    this.expansionId = data.expansionId
    this.name = data.name
    this.collectorNumber = data.collectorNumber
    this.pokemonRarity = data.pokemonRarity
    this.imageUrlPreview = data.imageUrlPreview
    this.imageUrlShow = data.imageUrlShow
  }

  toCardDto = (blueprintValues: Map<string, BlueprintValue>, userCardStack?: UserCardStack): CardDto => {
    const blueprintValue = blueprintValues.get(`${this.blueprintId}`)
    return {
      blueprintId: this.blueprintId,
      expansionId: this.expansionId,
      name: this.name,
      imageUrlPreview: this.imageUrlPreview,
      imageUrlShow: this.imageUrlShow,
      owned: userCardStack?.filter(this.blueprintId).length ?? 0,
      medianMarketValueCents: blueprintValue?.medianCents ?? -1,
      listingCount: blueprintValue?.listingCount ?? -1,
    }
  }
}

export default PokemonCard
