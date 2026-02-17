import { prisma } from '../../../prisma/prismaClient'
import { ICardTraderAdaptor } from '../clients/CardTrader/CardTraderAdaptor'

export interface IUserCard {
  add: (profileId: number, cardTraderBlueprintId: number, cardTraderExpansionId: number, condition: number) => Promise<void>
}

class UserCard implements IUserCard {
  private readonly cardTraderAdaptor: ICardTraderAdaptor

  constructor(cardTraderAdaptor: ICardTraderAdaptor) {
    this.cardTraderAdaptor = cardTraderAdaptor
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
    const existing = await prisma.expansionPlatformLink.findFirst({
      where: {
        platform: 'CARD_TRADER',
        externalId: String(cardTraderExpansionId),
      },
    })

    if (existing) return existing.expansionId

    const expansionName = await this.fetchExpansionName(cardTraderExpansionId)

    const pokemonGame = await prisma.game.upsert({
      where: { name: 'Pokemon' },
      update: {},
      create: { name: 'Pokemon' },
    })

    const expansion = await prisma.expansion.create({
      data: {
        gameId: pokemonGame.id,
        name: expansionName,
        imageUrl: '',
        numberOfCards: 0,
        releaseDate: new Date(),
      },
    })

    await prisma.expansionPokemon.create({
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

    await prisma.expansionPlatformLink.create({
      data: {
        expansionId: expansion.id,
        platform: 'CARD_TRADER',
        externalId: String(cardTraderExpansionId),
      },
    })

    return expansion.id
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
