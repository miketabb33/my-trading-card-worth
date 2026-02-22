import { Result } from '@logic/Result'
import { CollectionDto } from '../../../core/types/CollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetCollectionLogic {
  private readonly collectionFactory: ICollectionFactory

  constructor(collectionFactory: ICollectionFactory) {
    this.collectionFactory = collectionFactory
  }

  get = async (userId: number): Promise<Result<CollectionDto>> => {
    const collection = await this.collectionFactory.make(userId)

    return Result.success({
      cards: collection.cards(),
      meta: collection.details(),
    })
  }
}

export default GetCollectionLogic
