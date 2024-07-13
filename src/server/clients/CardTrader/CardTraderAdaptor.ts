import { ENV } from '../../env'
import { CardBlueprint } from '../../types/CardBlueprint'
import { CardExpansion } from '../../types/CardExpansion'
import { CardValue } from '../../types/CardValue'
import * as CardTraderClient from './CardTraderClient'
import { EXCLUDED_SET_IDS } from './excludedSetIds'
import { parseCardCondition } from './parseCardCondition'

export interface ICardTraderAdaptor {
  getPokemonSets: () => Promise<CardExpansion[]>
  getPokemonSetBlueprints: (expansionId: number) => Promise<CardBlueprint[]>
  getPokemonCardValues: (
    expansionId: number
  ) => Promise<Map<string, CardValue[]>>
}

class CardTraderAdaptor implements ICardTraderAdaptor {
  cardTraderConfig = ENV.CARD_TRADER

  getPokemonSets = async (): Promise<CardExpansion[]> => {
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

  getPokemonCardValues = async (
    expansionId: number
  ): Promise<Map<string, CardValue[]>> => {
    const productsMap =
      await CardTraderClient.getMarketplaceProducts(expansionId)

    const valueMap = new Map<string, CardValue[]>()

    productsMap.forEach((value, key) => {
      const cardValues = value.map((v) => {
        const cardValue: CardValue = {
          blueprintId: v.blueprintId,
          priceCents: v.price.cents,
          condition: parseCardCondition(v.propertiesHash.condition),
        }
        return cardValue
      })

      valueMap.set(key, cardValues)
    })

    return valueMap
  }
}

export default CardTraderAdaptor
