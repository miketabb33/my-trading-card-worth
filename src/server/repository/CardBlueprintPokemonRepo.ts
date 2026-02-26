import { Prisma } from '@prisma/client'
import { prisma } from '../../../prisma/prismaClient'

export type PokemonCardBlueprint = Prisma.CardBlueprintGetPayload<{
  include: { platformLinks: true; pokemonCardBlueprint: true }
}>

export type CreateCardBlueprintPokemonEntity = {
  expansionId: number
  cardTraderBlueprintId: number
  name: string
  collectorNumber: string
  rarity: string
  imageShowUrl: string
  imagePreviewUrl: string
}

export interface ICardBlueprintPokemonRepo {
  find: (cardTraderBlueprintId: number) => Promise<PokemonCardBlueprint | null>
  listByExpansion: (cardTraderExpansionId: number) => Promise<PokemonCardBlueprint[]>
  create: (entity: CreateCardBlueprintPokemonEntity) => Promise<number>
}

class CardBlueprintPokemonRepo implements ICardBlueprintPokemonRepo {
  find = async (cardTraderBlueprintId: number): Promise<PokemonCardBlueprint | null> => {
    return await prisma.cardBlueprint.findFirst({
      where: {
        platformLinks: {
          some: { platform: 'CARD_TRADER', externalId: String(cardTraderBlueprintId) },
        },
      },
      include: {
        platformLinks: true,
        pokemonCardBlueprint: true,
      },
    })
  }

  listByExpansion = async (cardTraderExpansionId: number): Promise<PokemonCardBlueprint[]> => {
    return await prisma.cardBlueprint.findMany({
      where: {
        expansion: {
          platformLinks: {
            some: { platform: 'CARD_TRADER', externalId: String(cardTraderExpansionId) },
          },
        },
      },
      include: {
        platformLinks: true,
        pokemonCardBlueprint: true,
      },
    })
  }

  create = async (entity: CreateCardBlueprintPokemonEntity): Promise<number> => {
    return await prisma.$transaction(async (tx) => {
      const cardBlueprint = await tx.cardBlueprint.create({
        data: {
          expansionId: entity.expansionId,
          name: entity.name,
          collectorNumber: entity.collectorNumber,
          imageShowUrl: entity.imageShowUrl,
          imagePreviewUrl: entity.imagePreviewUrl,
        },
      })

      await tx.cardBlueprintPokemon.create({
        data: {
          cardBlueprintId: cardBlueprint.id,
          rarity: entity.rarity,
        },
      })

      await tx.cardBlueprintPlatformLink.create({
        data: {
          cardBlueprintId: cardBlueprint.id,
          platform: 'CARD_TRADER',
          externalId: String(entity.cardTraderBlueprintId),
        },
      })

      return cardBlueprint.id
    })
  }
}

export default CardBlueprintPokemonRepo
