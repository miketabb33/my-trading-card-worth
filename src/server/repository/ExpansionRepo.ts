import { prisma } from '../../../prisma/prismaClient'

export type ExpansionEntity = {
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

export interface IExpansionRepo {
  find: (cardTraderExpansionId: number) => Promise<ExpansionEntity | null>
}

class ExpansionRepo implements IExpansionRepo {
  find = async (cardTraderExpansionId: number): Promise<ExpansionEntity | null> => {
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

export default ExpansionRepo
