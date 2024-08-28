import { ICollection } from '../../../src/server/domain/Collection'

class Collection_FAKE implements ICollection {
  COLLECTION = jest.fn()
  DETAILS = jest.fn()

  cards = this.COLLECTION
  details = this.DETAILS
}

export default Collection_FAKE
