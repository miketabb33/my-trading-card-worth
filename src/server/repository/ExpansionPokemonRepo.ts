import { GameName } from '@prisma/client'
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

export type CreateExpansionPokemonEntity = Omit<ExpansionPokemonEntity, 'id' | 'createdAt' | 'updatedAt'>

export interface IExpansionPokemonRepo {
  find: (cardTraderExpansionId: number) => Promise<ExpansionPokemonEntity | null>
  create: (entity: CreateExpansionPokemonEntity) => Promise<number>
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
  create = async (entity: CreateExpansionPokemonEntity): Promise<number> => {
    const game = await prisma.game.findUnique({ where: { name: GameName.Pokemon } })

    if (!game) throw new Error('Pokemon game not found')

    return await prisma.$transaction(async (tx) => {
      const expansion = await tx.expansion.create({
        data: {
          gameId: game.id,
          name: entity.name,
          imageUrl: entity.logoUrl ?? '',
          numberOfCards: entity.numberOfCards,
          releaseDate: entity.releaseDate,
        },
      })

      await tx.expansionPokemon.create({
        data: {
          expansionId: expansion.id,
          abbreviation: entity.abbreviation,
          series: entity.series,
          expansionType: entity.expansionType,
          expansionNumberInSeries: entity.expansionNumberInSeries,
          numberOfSecretCards: entity.numberOfSecretCards,
          symbolUrl: entity.symbolUrl ?? '',
          bulbapediaUrl: entity.bulbapediaUrl,
        },
      })

      await tx.expansionPlatformLink.create({
        data: {
          expansionId: expansion.id,
          platform: 'CARD_TRADER',
          externalId: String(entity.cardTraderExpansionId),
        },
      })

      return expansion.id
    })
  }
}

export default ExpansionPokemonRepo
