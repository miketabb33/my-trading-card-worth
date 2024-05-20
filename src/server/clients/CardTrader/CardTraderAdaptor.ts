import { CardSetDto } from '../../controllers/types/CardSetDto'
import * as CardTraderClient from './CardTraderClient'

export const POKEMON_SET_ID = 5

export const getPokemonSets = async (): Promise<CardSetDto[]> => {
  const expansionsDto = await CardTraderClient.getExpansions()
  const pokemonSets = expansionsDto.filter(
    (expansion) => expansion.gameId === POKEMON_SET_ID
  )
  return pokemonSets.map((expansion) => {
    return {
      id: expansion.id,
      name: expansion.name,
    }
  })
}
