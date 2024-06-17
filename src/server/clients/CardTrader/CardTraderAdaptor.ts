import { ENV } from '../../env'
import { CardBlueprint } from '../../types/CardBlueprint'
import { CardSet } from '../../types/CardSet'
import * as CardTraderClient from './CardTraderClient'
import { EXCLUDED_SET_IDS } from './excludedSetIds'

export interface ICardTraderAdaptor {
  getPokemonSets: () => Promise<CardSet[]>
  getPokemonSetBlueprints: (expansionId: number) => Promise<CardBlueprint[]>
}

class CardTraderAdaptor implements ICardTraderAdaptor {
  cardTraderConfig = ENV.CARD_TRADER

  getPokemonSets = async (): Promise<CardSet[]> => {
    const expansionsDto = await CardTraderClient.getExpansions()
    const pokemonSets = expansionsDto.filter(
      (expansion) => expansion.gameId === this.cardTraderConfig.POKEMON_GAME_ID
    )

    const filteredPokemonSets = pokemonSets.filter(
      (set) => !EXCLUDED_SET_IDS.includes(set.id)
    )

    return filteredPokemonSets.map((expansion) => {
      return {
        expansionId: expansion.id,
        name: expansion.name,
      }
    })
  }

  getPokemonSetBlueprints = async (
    expansionId: number
  ): Promise<CardBlueprint[]> => {
    const blueprints = await CardTraderClient.getBlueprints(expansionId)
    const singles = blueprints.filter(
      (blueprint) =>
        blueprint.categoryId ===
        this.cardTraderConfig.POKEMON_SINGLE_CARD_CATEGORY
    )
    return singles.map((blueprint) => {
      return {
        blueprintId: blueprint.id,
        expansionId: blueprint.expansionId,
        name: blueprint.name,
        version: blueprint.version || '',
        imageUrlPreview: `${this.cardTraderConfig.CARD_TRADER_BASE_URL}${blueprint.image.preview.url}`,
        imageUrlShow: `${this.cardTraderConfig.CARD_TRADER_BASE_URL}${blueprint.image.show.url}`,
      }
    })
  }
}

export default CardTraderAdaptor
