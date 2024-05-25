import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { CardSetDto } from '../../../core/types/CardSetDto'
import * as CardTraderClient from './CardTraderClient'
import {
  CARD_TRADER_BASE_URL,
  POKEMON_GAME_ID,
  POKEMON_SINGLE_CARD_CATEGORY,
} from './CardTraderConfig'

export const getPokemonSets = async (): Promise<CardSetDto[]> => {
  const expansionsDto = await CardTraderClient.getExpansions()
  const pokemonSets = expansionsDto.filter(
    (expansion) => expansion.gameId === POKEMON_GAME_ID
  )
  return pokemonSets.map((expansion) => {
    return {
      id: expansion.id,
      name: expansion.name,
    }
  })
}

export const getPokemonSet = async (
  expansionId: number
): Promise<CardBlueprintDto[]> => {
  const blueprints = await CardTraderClient.getBlueprints(expansionId)
  const singles = blueprints.filter(
    (blueprint) => blueprint.categoryId === POKEMON_SINGLE_CARD_CATEGORY
  )
  return singles.map((blueprint) => {
    return {
      cardTraderId: blueprint.id,
      name: blueprint.name,
      version: blueprint.version || '',
      imageUrlPreview: `${CARD_TRADER_BASE_URL}${blueprint.image.preview.url}`,
      imageUrlShow: `${CARD_TRADER_BASE_URL}${blueprint.image.show.url}`,
    }
  })
}
