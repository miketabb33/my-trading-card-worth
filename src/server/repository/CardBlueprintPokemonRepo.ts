import { prisma } from '../../../prisma/prismaClient'

export type CardBlueprintPokemonEntity = {
  id: number
  expansionId: number
  cardTraderBlueprintId: number
  name: string
  collectorNumber: string
  rarity: string
  imageShowUrl: string
  imagePreviewUrl: string
  createdAt: Date
  updatedAt: Date
}

export type CreateCardBlueprintPokemonEntity = Omit<CardBlueprintPokemonEntity, 'id' | 'createdAt' | 'updatedAt'>

export interface ICardBlueprintPokemonRepo {
  find: (cardTraderBlueprintId: number) => Promise<CardBlueprintPokemonEntity | null>
  create: (entity: CreateCardBlueprintPokemonEntity) => Promise<number>
}

class CardBlueprintPokemonRepo implements ICardBlueprintPokemonRepo {
  find = async (cardTraderBlueprintId: number): Promise<CardBlueprintPokemonEntity | null> => {
    const platformLink = await prisma.cardBlueprintPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderBlueprintId),
      },
      include: {
        cardBlueprint: {
          include: {
            pokemonCardBlueprint: true,
          },
        },
      },
    })

    if (!platformLink) return null

    const { cardBlueprint } = platformLink
    const pokemon = cardBlueprint.pokemonCardBlueprint

    if (!pokemon) return null

    return {
      id: cardBlueprint.id,
      expansionId: cardBlueprint.expansionId,
      cardTraderBlueprintId,
      name: cardBlueprint.name,
      collectorNumber: cardBlueprint.collectorNumber,
      rarity: pokemon.rarity,
      imageShowUrl: cardBlueprint.imageShowUrl,
      imagePreviewUrl: cardBlueprint.imagePreviewUrl,
      createdAt: cardBlueprint.createdAt,
      updatedAt: cardBlueprint.updatedAt,
    }
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
