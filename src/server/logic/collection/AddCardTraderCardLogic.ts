import { CardCondition, GameName, PrismaClient } from '@prisma/client'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'

export interface IAddCardTraderCardLogic {
  add: (
    profileId: number,
    cardTraderBlueprintId: number,
    cardTraderExpansionId: number,
    condition: CardCondition
  ) => Promise<void>
}

class AddCardTraderCardLogic implements IAddCardTraderCardLogic {
  private readonly prisma: PrismaClient
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionPokemonRepo: IExpansionPokemonRepo

  constructor(
    prisma: PrismaClient,
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionPokemonRepo: IExpansionPokemonRepo,
  ) {
    this.prisma = prisma
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionPokemonRepo = expansionPokemonRepo
  }

  add = async (profileId: number, cardTraderBlueprintId: number, cardTraderExpansionId: number, condition: CardCondition) => {
    const expansionId = await this.ensureExpansionExists(cardTraderExpansionId)
    await this.ensureBlueprintsExist(expansionId, cardTraderExpansionId)
    const cardBlueprintId = await this.getCardBlueprintId(cardTraderBlueprintId)

    await this.prisma.userCard.create({
      data: {
        profileId,
        cardBlueprintId,
        condition,
      },
    })
  }

  private ensureExpansionExists = async (cardTraderExpansionId: number): Promise<number> => {
    const existing = await this.expansionPokemonRepo.find(cardTraderExpansionId)

    if (existing) return existing.id

    const expansionName = await this.fetchExpansionName(cardTraderExpansionId)
    const game = await this.prisma.game.upsert({
      where: { name: GameName.Pokemon },
      update: {},
      create: { name: GameName.Pokemon },
    })
    const gameId = game.id

    return await this.prisma.$transaction(async (tx) => {
      const expansion = await tx.expansion.create({
        data: {
          gameId,
          name: expansionName,
          imageUrl: '',
          numberOfCards: 0,
          releaseDate: new Date(),
        },
      })

      await tx.expansionPokemon.create({
        data: {
          expansionId: expansion.id,
          abbreviation: '',
          series: '',
          expansionType: '',
          expansionNumberInSeries: 0,
          numberOfSecretCards: 0,
          symbolUrl: '',
          bulbapediaUrl: '',
        },
      })

      await tx.expansionPlatformLink.create({
        data: {
          expansionId: expansion.id,
          platform: 'CARD_TRADER',
          externalId: String(cardTraderExpansionId),
        },
      })

      return expansion.id
    })
  }

  private fetchExpansionName = async (cardTraderExpansionId: number): Promise<string> => {
    const expansions = await this.cardTraderAdaptor.getPokemonExpansions()
    const match = expansions.find((e) => e.expansionId === cardTraderExpansionId)
    return match?.name ?? ''
  }

  private ensureBlueprintsExist = async (expansionId: number, cardTraderExpansionId: number) => {
    const existingCount = await this.prisma.cardBlueprint.count({
      where: { expansionId },
    })

    if (existingCount > 0) return

    const blueprints = await this.cardTraderAdaptor.getPokemonBlueprints(cardTraderExpansionId)

    for (const blueprint of blueprints) {
      const cardBlueprint = await this.prisma.cardBlueprint.create({
        data: {
          expansionId,
          name: blueprint.name,
          collectorNumber: '',
          imageShowUrl: blueprint.imageUrlShow,
          imagePreviewUrl: blueprint.imageUrlPreview,
        },
      })

      await this.prisma.cardBlueprintPlatformLink.create({
        data: {
          cardBlueprintId: cardBlueprint.id,
          platform: 'CARD_TRADER',
          externalId: String(blueprint.blueprintId),
        },
      })
    }
  }

  private getCardBlueprintId = async (cardTraderBlueprintId: number): Promise<number> => {
    const link = await this.prisma.cardBlueprintPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderBlueprintId),
      },
    })

    if (!link) throw new Error(`Card blueprint not found for CardTrader blueprint ID: ${cardTraderBlueprintId}`)

    return link.cardBlueprintId
  }
}

export default AddCardTraderCardLogic
