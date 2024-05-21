import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { CardSetDto } from '../../../core/types/CardSetDto'
import * as CardTraderClient from './CardTraderClient'

export const POKEMON_GAME_ID = 5
export const POKEMON_SINGLE_CATEGORY = 73

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
    (blueprint) => blueprint.categoryId === POKEMON_SINGLE_CATEGORY
  )
  return singles.map((blueprint) => {
    return {
      cardTraderId: blueprint.id,
      name: blueprint.name,
      version: blueprint.version || '',
      imageUrl: blueprint.imageUrl,
    }
  })
}
