import { ShareCollectionDto } from '../../../core/types/ShareCollectionDto'
import { IProfileRepo } from '../../repository/ProfileRepo'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetShareCollectionLogic {
  private readonly collectionFactory: ICollectionFactory
  private readonly profileRepo: IProfileRepo

  constructor(collectionFactory: ICollectionFactory, profileRepo: IProfileRepo) {
    this.collectionFactory = collectionFactory
    this.profileRepo = profileRepo
  }

  get = async (userId: string): Promise<ShareCollectionDto> => {
    const collection = await this.collectionFactory.make(userId)
    const profile = await this.profileRepo.find(userId)

    return {
      cards: collection.cards(),
      meta: collection.details(),
      name: profile?.name || '',
    }
  }
}

export default GetShareCollectionLogic
