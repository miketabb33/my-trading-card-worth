import Logger from '../../../logger'
import CardTraderAdaptor from '../CardTraderAdaptor'

export const findCardTraderExpansionsWith0Cards = async () => {
  const cardTraderAdaptor = new CardTraderAdaptor()

  const pokemonExpansions = await cardTraderAdaptor.getPokemonExpansions()
  const zeroItems: number[] = []

  for (let i = 0; i < pokemonExpansions.length; i++) {
    const expansion = pokemonExpansions[i]
    const cardBlueprints = await cardTraderAdaptor.getPokemonBlueprints(
      expansion.expansionId
    )
    if (cardBlueprints.length === 0) zeroItems.push(expansion.expansionId)
    Logger.info(
      `${expansion.expansionId}, ${expansion.name}, ${cardBlueprints.length}`
    )
  }

  return zeroItems
}
