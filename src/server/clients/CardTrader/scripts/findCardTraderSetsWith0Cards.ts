import { getPokemonSetBlueprints, getPokemonSets } from '../CardTraderAdaptor'

export const findCardTraderSetsWith0Cards = async () => {
  const pokemonSets = await getPokemonSets()
  const zeroItems: number[] = []

  for (let i = 0; i < pokemonSets.length; i++) {
    const set = pokemonSets[i]
    const cards = await getPokemonSetBlueprints(set.expansionId)
    if (cards.length === 0) zeroItems.push(set.expansionId)
    console.log(set.expansionId, set.name, cards.length)
  }

  return zeroItems
}
