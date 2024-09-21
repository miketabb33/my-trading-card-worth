import { IMyCardCRUD } from '../database/repository/MyCardCRUD'
import { BlueprintValue } from '../types/BlueprintValue'
import Collection, { ICollection } from './Collection'

export interface ICollectionFactory {
  make: (userId: string) => Promise<ICollection>
}

class CollectionFactory implements ICollectionFactory {
  private readonly cardCRUD: IMyCardCRUD
  private readonly blueprintValues: Map<string, BlueprintValue>

  constructor(cardCRUD: IMyCardCRUD, blueprintValues: Map<string, BlueprintValue>) {
    this.cardCRUD = cardCRUD
    this.blueprintValues = blueprintValues
  }

  make = async (userId: string): Promise<ICollection> => {
    const cardEntities = await this.cardCRUD.getAll(userId)
    return new Collection(cardEntities, this.blueprintValues)
  }
}

export default CollectionFactory
