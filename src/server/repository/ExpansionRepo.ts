import { Prisma } from '@prisma/client'
import { prisma } from '../../../prisma/prismaClient'

export type ExpansionEntity = {
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

export type CreateExpansionArgs = {
  expansion: Prisma.ExpansionUncheckedCreateInput
  pokemon: Omit<Prisma.ExpansionPokemonUncheckedCreateInput, 'expansionId'>
  platformLink: Omit<Prisma.ExpansionPlatformLinkUncheckedCreateInput, 'expansionId'>
}

export interface IExpansionRepo {
  find: (cardTraderExpansionId: number) => Promise<ExpansionEntity | null>
  create: (args: CreateExpansionArgs) => Promise<number>
}

class ExpansionRepo implements IExpansionRepo {
  create = async ({ expansion: expansionData, pokemon: pokemonData, platformLink: platformLinkData }: CreateExpansionArgs): Promise<number> => {
    const expansion = await prisma.expansion.create({ data: expansionData })

    await prisma.expansionPokemon.create({
      data: { ...pokemonData, expansionId: expansion.id },
    })

    await prisma.expansionPlatformLink.create({
      data: { ...platformLinkData, expansionId: expansion.id },
    })

    return expansion.id
  }

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

export default ExpansionRepo
