import { ShareCollectionDto } from '../../../core/types/ShareCollectionDto'
import { IProfileCRUD } from '../../database/repository/ProfileCRUD'
import { ICollectionFactory } from '../../domain/CollectionFactory'

class GetShareCollectionLogic {
  private readonly collectionFactory: ICollectionFactory
  private readonly profileCRUD: IProfileCRUD

  constructor(
    collectionFactory: ICollectionFactory,
    profileCRUD: IProfileCRUD
  ) {
    this.collectionFactory = collectionFactory
    this.profileCRUD = profileCRUD
  }

  get = async (userId: string): Promise<ShareCollectionDto> => {
    const collection = await this.collectionFactory.make(userId)
    const profile = await this.profileCRUD.find(userId)

    return {
      cards: collection.cards(),
      details: collection.details(),
      name: profile?.name || '',
    }
  }
}

export default GetShareCollectionLogic
