import { PrismaClient } from '@prisma/client'
import { ShareCollectionDto } from '../../../core/types/ShareCollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetShareCollectionLogic {
  private readonly prisma: PrismaClient
  private readonly collectionFactory: ICollectionFactory

  constructor(prisma: PrismaClient, collectionFactory: ICollectionFactory) {
    this.prisma = prisma
    this.collectionFactory = collectionFactory
  }

  get = async (userId: string): Promise<ShareCollectionDto> => {
    const collection = await this.collectionFactory.make(userId)
    const user = await this.prisma.user.findUnique({ where: { externalId: userId } })

    return {
      cards: collection.cards(),
      meta: collection.details(),
      name: user?.name || '',
    }
  }
}

export default GetShareCollectionLogic
