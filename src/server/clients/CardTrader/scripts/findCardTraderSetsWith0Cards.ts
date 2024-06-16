import { getPokemonSet, getPokemonSets } from '../CardTraderAdaptor'

export const findCardTraderSetsWith0Cards = async () => {
  const pokemonSets = await getPokemonSets()
  const zeroItems: number[] = []

  for (let i = 0; i < pokemonSets.length; i++) {
    const set = pokemonSets[i]
    const cards = await getPokemonSet(set.cardTraderExpansionId)
    if (cards.length === 0) zeroItems.push(set.cardTraderExpansionId)
    console.log(set.cardTraderExpansionId, set.name, cards.length)
  }

  return zeroItems
}
