import GetCollectionLogic from '../../../../src/server/logic/collection/GetCollectionLogic'
import Collection_FAKE from '../../__FAKES__/Collection.fake'
import CollectionFactory_FAKE from '../../__FAKES__/CollectionFactory.fake'

describe('Get Collection Logic', () => {
  let getCollectionLogic: GetCollectionLogic
  let collection_FAKE: Collection_FAKE
  let collectionFactory_FAKE: CollectionFactory_FAKE

  const USER_ID = '12345'

  beforeEach(() => {
    jest.clearAllMocks()
    collection_FAKE = new Collection_FAKE()
    collectionFactory_FAKE = new CollectionFactory_FAKE()
    getCollectionLogic = new GetCollectionLogic(collectionFactory_FAKE)

    collectionFactory_FAKE.MAKE.mockReturnValue(collection_FAKE)
  })

  it('should return values', async () => {
    const expectedCards = { collection: 'collection' }
    const expectedDetails = { details: 'details' }

    collection_FAKE.COLLECTION.mockReturnValue(expectedCards)
    collection_FAKE.DETAILS.mockReturnValue(expectedDetails)

    const result = await getCollectionLogic.get(USER_ID)

    expect(collectionFactory_FAKE.MAKE).toHaveBeenCalledWith(USER_ID)

    expect(result.cards).toEqual(expectedCards)
    expect(result.meta).toEqual(expectedDetails)
  })
})
