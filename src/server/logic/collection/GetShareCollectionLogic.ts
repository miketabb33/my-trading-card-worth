import { ShareCollectionDto } from '../../../core/types/ShareCollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetShareCollectionLogic {
  private readonly collectionFactory: ICollectionFactory

  constructor(collectionFactory: ICollectionFactory) {
    this.collectionFactory = collectionFactory
  }

  get = async (userId: string): Promise<ShareCollectionDto> => {
    const collection = await this.collectionFactory.make(userId)

    return {
      cards: collection.cards(),
      details: collection.details(),
      name: 'TestName',
    }
  }
}

export default GetShareCollectionLogic
