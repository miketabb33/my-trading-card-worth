import { ENV } from '../../env'
import { CardBlueprint } from '../../types/CardBlueprint'
import { CardExpansion } from '../../types/CardExpansion'
import { CardValue } from '../../types/CardValue'
import * as CardTraderClient from './CardTraderClient'
import { EXCLUDED_EXPANSION_IDS } from './excludedExpansionIds'
import { parseCardCondition } from './parseCardCondition'

export interface ICardTraderAdaptor {
  getPokemonExpansions: () => Promise<CardExpansion[]>
  getPokemonBlueprints: (expansionId: number) => Promise<CardBlueprint[]>
  getPokemonCardValues: (
    expansionId: number
  ) => Promise<Map<string, CardValue[]>>
}

class CardTraderAdaptor implements ICardTraderAdaptor {
  cardTraderConfig = ENV.CARD_TRADER

  getPokemonExpansions = async (): Promise<CardExpansion[]> => {
    const expansionsDto = await CardTraderClient.getExpansions()
    const pokemonExpansions = expansionsDto.filter(
      (expansion) => expansion.gameId === this.cardTraderConfig.POKEMON_GAME_ID
    )

    const filteredPokemonExpansions = pokemonExpansions.filter(
      (expansion) => !EXCLUDED_EXPANSION_IDS.includes(expansion.id)
    )

    return filteredPokemonExpansions.map((expansion) => {
      return {
        expansionId: expansion.id,
        name: expansion.name,
      }
    })
  }

  getPokemonBlueprints = async (
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
    const blueprintIdToProductsMap =
      await CardTraderClient.getMarketplaceProducts(expansionId)

    const blueprintIdToCardValueMap = new Map<string, CardValue[]>()

    blueprintIdToProductsMap.forEach((value, key) => {
      const cardValues = value.map((v) => {
        const cardValue: CardValue = {
          blueprintId: v.blueprintId,
          priceCents: v.price.cents,
          condition: parseCardCondition(v.propertiesHash.condition),
        }
        return cardValue
      })

      blueprintIdToCardValueMap.set(key, cardValues)
    })

    return blueprintIdToCardValueMap
  }
}

export default CardTraderAdaptor
