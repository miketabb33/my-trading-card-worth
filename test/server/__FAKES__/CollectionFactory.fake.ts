import { ICollectionFactory } from '../../../src/server/domain/CollectionFactory'

class CollectionFactory_FAKE implements ICollectionFactory {
  MAKE = jest.fn()

  make = this.MAKE
}

export default CollectionFactory_FAKE
