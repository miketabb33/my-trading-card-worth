import { PrismaClient } from '@prisma/client'
import { ShareCollectionDto } from '../../../core/types/ShareCollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'
import { Result } from '../Result'

class GetShareCollectionUseCase {
  private readonly prisma: PrismaClient
  private readonly collectionFactory: ICollectionFactory

  constructor(prisma: PrismaClient, collectionFactory: ICollectionFactory) {
    this.prisma = prisma
    this.collectionFactory = collectionFactory
  }

  get = async (userId: number): Promise<Result<ShareCollectionDto>> => {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) return Result.failure('user not found')

    const collection = await this.collectionFactory.make(userId)

    return Result.success({
      cards: collection.cards(),
      meta: collection.details(),
      name: user.name,
    })
  }
}

export default GetShareCollectionUseCase
