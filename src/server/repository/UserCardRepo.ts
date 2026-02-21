/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { prisma } from '../../../prisma/prismaClient'

export type MyCardItemEntity = {
  condition: number
}

export type MyCardEntity = {
  _id: string
  userId: string
  name: string
  items: MyCardItemEntity[]
  imageUrlPreview: string
  imageUrlShow: string
  cardTrader: {
    blueprintId: number
    expansionId: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface IUserCardRepo {
  addItem: (userId: string, blueprintId: number, item: MyCardItemEntity) => Promise<void>
  delete: (userId: string, blueprintId: number) => Promise<void>
  removeItem: (userId: string, blueprintId: number) => Promise<void>
  findByExpansion: (userId: string, expansionId: number) => Promise<MyCardEntity[]>
  findByBlueprintId: (userId: string, blueprintId: number) => Promise<MyCardEntity | null>
  getAll: (userId: string) => Promise<MyCardEntity[]>
}

class UserCardRepo implements IUserCardRepo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem = async (userId: string, blueprintId: number, item: MyCardItemEntity): Promise<void> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    await prisma.userCard.create({
      data: { profileId: profile.id, cardBlueprintId, condition: 'UNKNOWN' },
    })
  }

  delete = async (userId: string, blueprintId: number): Promise<void> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    await prisma.userCard.deleteMany({
      where: { profileId: profile.id, cardBlueprintId },
    })
  }

  removeItem = async (userId: string, blueprintId: number): Promise<void> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    const card = await prisma.userCard.findFirst({
      where: { profileId: profile.id, cardBlueprintId },
    })
    if (!card) return

    await prisma.userCard.delete({ where: { id: card.id } })
  }

  findByExpansion = async (userId: string, cardTraderExpansionId: number): Promise<MyCardEntity[]> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return []

    const userCards = await prisma.userCard.findMany({
      where: {
        profileId: profile.id,
        cardBlueprint: {
          expansion: {
            platformLinks: {
              some: { platform: 'CARD_TRADER', externalId: String(cardTraderExpansionId) },
            },
          },
        },
      },
      include: this.blueprintInclude,
    })

    return this.toMyCardEntities(userId, userCards)
  }

  findByBlueprintId = async (userId: string, cardTraderBlueprintId: number): Promise<MyCardEntity | null> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return null

    const userCards = await prisma.userCard.findMany({
      where: {
        profileId: profile.id,
        cardBlueprint: {
          platformLinks: {
            some: { platform: 'CARD_TRADER', externalId: String(cardTraderBlueprintId) },
          },
        },
      },
      include: this.blueprintInclude,
    })

    if (userCards.length === 0) return null

    return this.toMyCardEntities(userId, userCards)[0]
  }

  getAll = async (userId: string): Promise<MyCardEntity[]> => {
    const profile = await prisma.profile.findUnique({ where: { userId } })
    if (!profile) return []

    const userCards = await prisma.userCard.findMany({
      where: { profileId: profile.id },
      include: this.blueprintInclude,
    })

    return this.toMyCardEntities(userId, userCards)
  }

  private findCardBlueprintId = async (cardTraderBlueprintId: number): Promise<number | null> => {
    const link = await prisma.cardBlueprintPlatformLink.findFirst({
      where: { platform: 'CARD_TRADER', externalId: String(cardTraderBlueprintId) },
    })
    return link?.cardBlueprintId ?? null
  }

  private blueprintInclude = {
    cardBlueprint: {
      include: {
        platformLinks: true,
        expansion: {
          include: { platformLinks: true },
        },
      },
    },
  }

  private toMyCardEntities = (userId: string, userCards: any[]): MyCardEntity[] => {
    const grouped = new Map<number, any[]>()

    for (const uc of userCards) {
      const id = uc.cardBlueprintId as number
      if (!grouped.has(id)) grouped.set(id, [])
      grouped.get(id)!.push(uc)
    }

    return Array.from(grouped.values()).map((cards): MyCardEntity => {
      const first = cards[0]
      const blueprint = first.cardBlueprint
      const blueprintLink = blueprint.platformLinks.find((l: any) => l.platform === 'CARD_TRADER')
      const expansionLink = blueprint.expansion.platformLinks.find((l: any) => l.platform === 'CARD_TRADER')

      return {
        _id: String(blueprint.id),
        userId,
        name: blueprint.name,
        items: cards.map((): MyCardItemEntity => ({ condition: 0 })),
        imageUrlPreview: blueprint.imagePreviewUrl,
        imageUrlShow: blueprint.imageShowUrl,
        cardTrader: {
          blueprintId: Number(blueprintLink?.externalId ?? 0),
          expansionId: Number(expansionLink?.externalId ?? 0),
        },
        createdAt: first.createdAt,
        updatedAt: first.updatedAt,
      }
    })
  }
}

export default UserCardRepo
