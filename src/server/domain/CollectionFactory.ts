import { IMyCardRepo } from '../repository/MyCardRepo'
import { BlueprintValue } from '../types/BlueprintValue'
import Collection, { ICollection } from './Collection'

export interface ICollectionFactory {
  make: (userId: string) => Promise<ICollection>
}

class CollectionFactory implements ICollectionFactory {
  private readonly cardRepo: IMyCardRepo
  private readonly blueprintValues: Map<string, BlueprintValue>

  constructor(cardRepo: IMyCardRepo, blueprintValues: Map<string, BlueprintValue>) {
    this.cardRepo = cardRepo
    this.blueprintValues = blueprintValues
  }

  make = async (userId: string): Promise<ICollection> => {
    const cardEntities = await this.cardRepo.getAll(userId)
    return new Collection(cardEntities, this.blueprintValues)
  }
}

export default CollectionFactory
