/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from '@prisma/client'
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

export type UserCardWithBlueprint = Prisma.UserCardGetPayload<{
  include: { cardBlueprint: { include: { platformLinks: true } } }
}>

export interface IUserCardRepo {
  addItem: (userId: string, blueprintId: number, item: MyCardItemEntity) => Promise<void>
  delete: (userId: string, blueprintId: number) => Promise<void>
  removeItem: (userId: string, blueprintId: number) => Promise<void>
  listByExpansion: (userId: number, expansionId: number) => Promise<UserCardWithBlueprint[]>
  findByBlueprintId: (userId: string, blueprintId: number) => Promise<MyCardEntity | null>
  getAll: (userId: number) => Promise<UserCardWithBlueprint[]>
}

class UserCardRepo implements IUserCardRepo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem = async (userId: string, blueprintId: number, item: MyCardItemEntity): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { externalId: userId } })
    if (!user) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    await prisma.userCard.create({
      data: { userId: user.id, cardBlueprintId, condition: 'UNKNOWN' },
    })
  }

  delete = async (userId: string, blueprintId: number): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { externalId: userId } })
    if (!user) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    await prisma.userCard.deleteMany({
      where: { userId: user.id, cardBlueprintId },
    })
  }

  removeItem = async (userId: string, blueprintId: number): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { externalId: userId } })
    if (!user) return

    const cardBlueprintId = await this.findCardBlueprintId(blueprintId)
    if (!cardBlueprintId) return

    const card = await prisma.userCard.findFirst({
      where: { userId: user.id, cardBlueprintId },
    })
    if (!card) return

    await prisma.userCard.delete({ where: { id: card.id } })
  }

  listByExpansion = async (userId: number, cardTraderExpansionId: number): Promise<UserCardWithBlueprint[]> => {
    const expansionLink = await prisma.expansionPlatformLink.findFirst({
      where: { platform: 'CARD_TRADER', externalId: String(cardTraderExpansionId) },
      select: { expansionId: true },
    })

    if (!expansionLink) return []

    return prisma.userCard.findMany({
      where: { userId, cardBlueprint: { expansionId: expansionLink.expansionId } },
      include: {
        cardBlueprint: {
          include: { platformLinks: true },
        },
      },
    })
  }

  findByBlueprintId = async (userId: string, cardTraderBlueprintId: number): Promise<MyCardEntity | null> => {
    const user = await prisma.user.findUnique({ where: { externalId: userId } })
    if (!user) return null

    const userCards = await prisma.userCard.findMany({
      where: {
        userId: user.id,
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

  getAll = async (userId: number): Promise<UserCardWithBlueprint[]> => {
    return await prisma.userCard.findMany({
      where: { id: userId },
      include: { cardBlueprint: { include: { platformLinks: true } } },
    })
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
