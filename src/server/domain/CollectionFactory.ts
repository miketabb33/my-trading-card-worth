import { IUserCardRepo } from '../repository/UserCardRepo'
import { BlueprintValue } from '../types/BlueprintValue'
import Collection, { ICollection } from './Collection'

export interface ICollectionFactory {
  make: (userId: number) => Promise<ICollection>
}

class CollectionFactory implements ICollectionFactory {
  private readonly cardRepo: IUserCardRepo
  private readonly blueprintValues: Map<string, BlueprintValue>

  constructor(cardRepo: IUserCardRepo, blueprintValues: Map<string, BlueprintValue>) {
    this.cardRepo = cardRepo
    this.blueprintValues = blueprintValues
  }

  make = async (userId: number): Promise<ICollection> => {
    const cards = await this.cardRepo.listAll(userId)
    return new Collection(cards, this.blueprintValues)
  }
}

export default CollectionFactory
