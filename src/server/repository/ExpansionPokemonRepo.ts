import { prisma } from '../../../prisma/prismaClient'

export type ExpansionPokemonEntity = {
  id: number
  cardTraderExpansionId: number
  name: string
  expansionNumberInSeries: number
  series: string
  expansionType: string
  numberOfCards: number
  numberOfSecretCards: number
  releaseDate: Date
  abbreviation: string
  symbolUrl: string | null
  logoUrl: string | null
  bulbapediaUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface IExpansionPokemonRepo {
  find: (cardTraderExpansionId: number) => Promise<ExpansionPokemonEntity | null>
}

class ExpansionPokemonRepo implements IExpansionPokemonRepo {
  find = async (cardTraderExpansionId: number): Promise<ExpansionPokemonEntity | null> => {
    const platformLink = await prisma.expansionPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderExpansionId),
      },
      include: {
        expansion: {
          include: {
            pokemonExpansion: true,
          },
        },
      },
    })

    if (!platformLink) return null

    const { expansion } = platformLink
    const pokemon = expansion.pokemonExpansion

    if (!pokemon) return null

    return {
      id: expansion.id,
      cardTraderExpansionId,
      name: expansion.name,
      expansionNumberInSeries: pokemon.expansionNumberInSeries,
      series: pokemon.series,
      expansionType: pokemon.expansionType,
      numberOfCards: expansion.numberOfCards,
      numberOfSecretCards: pokemon.numberOfSecretCards,
      releaseDate: expansion.releaseDate,
      abbreviation: pokemon.abbreviation,
      symbolUrl: pokemon.symbolUrl || null,
      logoUrl: expansion.imageUrl || null,
      bulbapediaUrl: pokemon.bulbapediaUrl,
      createdAt: expansion.createdAt,
      updatedAt: expansion.updatedAt,
    }
  }
}

export default ExpansionPokemonRepo
