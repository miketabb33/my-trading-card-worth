import { Result } from '@use-cases/Result'
import { CollectionDto } from '../../../core/types/CollectionDto'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetCollectionUseCase {
  private readonly collectionFactory: ICollectionFactory

  constructor(collectionFactory: ICollectionFactory) {
    this.collectionFactory = collectionFactory
  }

  call = async (userId: number): Promise<Result<CollectionDto>> => {
    const collection = await this.collectionFactory.make(userId)

    return Result.success({
      cards: collection.cards(),
      meta: collection.details(),
    })
  }
}

export default GetCollectionUseCase
