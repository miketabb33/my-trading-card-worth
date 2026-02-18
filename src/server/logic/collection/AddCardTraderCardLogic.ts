import { CardCondition, PrismaClient } from '@prisma/client'
import { ICardTraderAdaptor } from '../../clients/CardTrader/CardTraderAdaptor'
import { IExpansionPokemonRepo } from '../../repository/ExpansionPokemonRepo'
import { ICardBlueprintPokemonRepo } from '../../repository/CardBlueprintPokemonRepo'

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
  private readonly cardBlueprintPokemonRepo: ICardBlueprintPokemonRepo

  constructor(
    prisma: PrismaClient,
    cardTraderAdaptor: ICardTraderAdaptor,
    expansionPokemonRepo: IExpansionPokemonRepo,
    cardBlueprintPokemonRepo: ICardBlueprintPokemonRepo
  ) {
    this.prisma = prisma
    this.cardTraderAdaptor = cardTraderAdaptor
    this.expansionPokemonRepo = expansionPokemonRepo
    this.cardBlueprintPokemonRepo = cardBlueprintPokemonRepo
  }

  add = async (
    profileId: number,
    cardTraderBlueprintId: number,
    cardTraderExpansionId: number,
    condition: CardCondition
  ) => {
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

    return await this.expansionPokemonRepo.create({
      cardTraderExpansionId,
      name: expansionName,
      abbreviation: '',
      series: '',
      expansionType: '',
      expansionNumberInSeries: 0,
      numberOfCards: 0,
      numberOfSecretCards: 0,
      releaseDate: new Date(),
      symbolUrl: null,
      logoUrl: null,
      bulbapediaUrl: '',
    })
  }

  private fetchExpansionName = async (cardTraderExpansionId: number): Promise<string> => {
    const expansions = await this.cardTraderAdaptor.getPokemonExpansions()
    const match = expansions.find((e) => e.expansionId === cardTraderExpansionId)
    return match?.name ?? ''
  }

  private ensureBlueprintsExist = async (expansionId: number, cardTraderExpansionId: number) => {
    const blueprints = await this.cardTraderAdaptor.getPokemonBlueprints(cardTraderExpansionId)

    for (const blueprint of blueprints) {
      const existing = await this.cardBlueprintPokemonRepo.find(blueprint.blueprintId)

      if (existing) continue

      await this.cardBlueprintPokemonRepo.create({
        expansionId,
        cardTraderBlueprintId: blueprint.blueprintId,
        name: blueprint.name,
        collectorNumber: blueprint.collectorNumber,
        rarity: blueprint.pokemonRarity,
        imageShowUrl: blueprint.imageUrlShow,
        imagePreviewUrl: blueprint.imageUrlPreview,
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
