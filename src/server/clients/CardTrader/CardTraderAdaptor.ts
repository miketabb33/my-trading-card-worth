import { CardBlueprintDto } from '../../../core/types/CardBlueprintDto'
import { CardSetDto } from '../../../core/types/CardSetDto'
import { ENV } from '../../env'
import * as CardTraderClient from './CardTraderClient'

const CARD_TRADER = ENV.CARD_TRADER

export const getPokemonSets = async (): Promise<CardSetDto[]> => {
  const expansionsDto = await CardTraderClient.getExpansions()
  const pokemonSets = expansionsDto.filter(
    (expansion) => expansion.gameId === CARD_TRADER.POKEMON_GAME_ID
  )
  return pokemonSets.map((expansion) => {
    return {
      cardTraderExpansionId: expansion.id,
      name: expansion.name,
    }
  })
}

export const getPokemonSet = async (
  expansionId: number
): Promise<CardBlueprintDto[]> => {
  const blueprints = await CardTraderClient.getBlueprints(expansionId)
  const singles = blueprints.filter(
    (blueprint) =>
      blueprint.categoryId === CARD_TRADER.POKEMON_SINGLE_CARD_CATEGORY
  )
  return singles.map((blueprint) => {
    return {
      cardTraderBlueprintId: blueprint.id,
      cardTraderExpansionId: blueprint.expansionId,
      name: blueprint.name,
      version: blueprint.version || '',
      imageUrlPreview: `${CARD_TRADER.CARD_TRADER_BASE_URL}${blueprint.image.preview.url}`,
      imageUrlShow: `${CARD_TRADER.CARD_TRADER_BASE_URL}${blueprint.image.show.url}`,
    }
  })
}
