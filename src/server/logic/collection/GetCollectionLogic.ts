import { CollectionDto } from '../../../core/types/CollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetCollectionLogic {
  private readonly collectionFactory: ICollectionFactory

  constructor(collectionFactory: ICollectionFactory) {
    this.collectionFactory = collectionFactory
  }

  get = async (userId: string): Promise<CollectionDto> => {
    const collection = await this.collectionFactory.make(userId)

    return {
      cards: collection.cards(),
      meta: collection.details(),
    }
  }
}

export default GetCollectionLogic
