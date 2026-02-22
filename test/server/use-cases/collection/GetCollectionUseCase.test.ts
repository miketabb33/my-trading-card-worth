import GetCollectionUseCase from '../../../../src/server/use-cases/collection/GetCollectionUseCase'
import Collection_FAKE from '../../__FAKES__/Collection.fake'
import CollectionFactory_FAKE from '../../__FAKES__/CollectionFactory.fake'

describe('Get Collection UseCase', () => {
  let getCollectionUseCase: GetCollectionUseCase
  let collection_FAKE: Collection_FAKE
  let collectionFactory_FAKE: CollectionFactory_FAKE

  const USER_ID = 12345

  beforeEach(() => {
    jest.clearAllMocks()
    collection_FAKE = new Collection_FAKE()
    collectionFactory_FAKE = new CollectionFactory_FAKE()
    getCollectionUseCase = new GetCollectionUseCase(collectionFactory_FAKE)

    collectionFactory_FAKE.MAKE.mockReturnValue(collection_FAKE)
  })

  it('should return values', async () => {
    const expectedCards = { collection: 'collection' }
    const expectedDetails = { details: 'details' }

    collection_FAKE.COLLECTION.mockReturnValue(expectedCards)
    collection_FAKE.DETAILS.mockReturnValue(expectedDetails)

    const result = await getCollectionUseCase.get(USER_ID)

    expect(collectionFactory_FAKE.MAKE).toHaveBeenCalledWith(USER_ID)

    expect(result.value.cards).toEqual(expectedCards)
    expect(result.value.meta).toEqual(expectedDetails)
  })
})
