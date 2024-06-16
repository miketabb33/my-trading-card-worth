import { ENV } from '../../env'
import { CardBlueprint } from '../../types/CardBlueprint'
import { CardSet } from '../../types/CardSet'
import * as CardTraderClient from './CardTraderClient'
import { EXCLUDED_SET_IDS } from './excludedSetIds'

const CARD_TRADER = ENV.CARD_TRADER

export const getPokemonSets = async (): Promise<CardSet[]> => {
  const expansionsDto = await CardTraderClient.getExpansions()
  const pokemonSets = expansionsDto.filter(
    (expansion) => expansion.gameId === CARD_TRADER.POKEMON_GAME_ID
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

export const getPokemonSetBlueprints = async (
  expansionId: number
): Promise<CardBlueprint[]> => {
  const blueprints = await CardTraderClient.getBlueprints(expansionId)
  const singles = blueprints.filter(
    (blueprint) =>
      blueprint.categoryId === CARD_TRADER.POKEMON_SINGLE_CARD_CATEGORY
  )
  return singles.map((blueprint) => {
    return {
      blueprintId: blueprint.id,
      expansionId: blueprint.expansionId,
      name: blueprint.name,
      version: blueprint.version || '',
      imageUrlPreview: `${CARD_TRADER.CARD_TRADER_BASE_URL}${blueprint.image.preview.url}`,
      imageUrlShow: `${CARD_TRADER.CARD_TRADER_BASE_URL}${blueprint.image.show.url}`,
    }
  })
}
