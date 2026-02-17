import { prisma } from '../../../prisma/prismaClient'
import { ICardTraderAdaptor } from '../clients/CardTrader/CardTraderAdaptor'
import { IExpansionRepo } from '../repository/ExpansionRepo'
import { IGameRepo } from '../repository/GameRepo'

export interface IUserCard {
  add: (
    profileId: number,
    cardTraderBlueprintId: number,
    cardTraderExpansionId: number,
    condition: number
  ) => Promise<void>
}

class UserCard implements IUserCard {
  private readonly cardTraderAdaptor: ICardTraderAdaptor
  private readonly expansionRepo: IExpansionRepo
  private readonly gameRepo: IGameRepo

  constructor(cardTraderAdaptor: ICardTraderAdaptor, expansionRepo: IExpansionRepo, gameRepo: IGameRepo) {
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionRepo = expansionRepo
    this.gameRepo = gameRepo
  }

  add = async (profileId: number, cardTraderBlueprintId: number, cardTraderExpansionId: number, condition: number) => {
    const expansionId = await this.ensureExpansionExists(cardTraderExpansionId)
    await this.ensureBlueprintsExist(expansionId, cardTraderExpansionId)
    const cardBlueprintId = await this.getCardBlueprintId(cardTraderBlueprintId)

    await prisma.userCard.create({
      data: {
        profileId,
        cardBlueprintId,
        condition,
      },
    })
  }

  private ensureExpansionExists = async (cardTraderExpansionId: number): Promise<number> => {
    const existing = await this.expansionRepo.find(cardTraderExpansionId)

    if (existing) return existing.id

    const expansionName = await this.fetchExpansionName(cardTraderExpansionId)
    const gameId = await this.gameRepo.findOrCreate('Pokemon')

    return await this.expansionRepo.create({
      expansion: {
        gameId,
        name: expansionName,
        imageUrl: '',
        numberOfCards: 0,
        releaseDate: new Date(),
      },
      pokemon: {
        abbreviation: '',
        series: '',
        expansionType: '',
        expansionNumberInSeries: 0,
        numberOfSecretCards: 0,
        symbolUrl: '',
        bulbapediaUrl: '',
      },
      platformLink: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderExpansionId),
      },
    })
  }

  private fetchExpansionName = async (cardTraderExpansionId: number): Promise<string> => {
    const expansions = await this.cardTraderAdaptor.getPokemonExpansions()
    const match = expansions.find((e) => e.expansionId === cardTraderExpansionId)
    return match?.name ?? ''
  }

  private ensureBlueprintsExist = async (expansionId: number, cardTraderExpansionId: number) => {
    const existingCount = await prisma.cardBlueprint.count({
      where: { expansionId },
    })

    if (existingCount > 0) return

    const blueprints = await this.cardTraderAdaptor.getPokemonBlueprints(cardTraderExpansionId)

    for (const blueprint of blueprints) {
      const cardBlueprint = await prisma.cardBlueprint.create({
        data: {
          expansionId,
          name: blueprint.name,
          collectorNumber: '',
          imageShowUrl: blueprint.imageUrlShow,
          imagePreviewUrl: blueprint.imageUrlPreview,
        },
      })

      await prisma.cardBlueprintPlatformLink.create({
        data: {
          cardBlueprintId: cardBlueprint.id,
          platform: 'CARD_TRADER',
          externalId: String(blueprint.blueprintId),
        },
      })
    }
  }

  private getCardBlueprintId = async (cardTraderBlueprintId: number): Promise<number> => {
    const link = await prisma.cardBlueprintPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderBlueprintId),
      },
    })

    if (!link) throw new Error(`Card blueprint not found for CardTrader blueprint ID: ${cardTraderBlueprintId}`)

    return link.cardBlueprintId
  }
}

export default UserCard
