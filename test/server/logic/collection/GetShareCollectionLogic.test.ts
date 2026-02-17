import { makePrismaClientMock } from '../../__MOCKS__/prismaClient.mock'
import GetShareCollectionLogic from '../../../../src/server/logic/collection/GetShareCollectionLogic'
import Collection_FAKE from '../../__FAKES__/Collection.fake'
import CollectionFactory_FAKE from '../../__FAKES__/CollectionFactory.fake'
import { makeProfileEntityMock } from '../../__MOCKS__/profileEntity.mock'

const mockPrisma = makePrismaClientMock({ profile: { findUnique: jest.fn() } })

describe('Get Share Collection Logic', () => {
  let getShareCollectionLogic: GetShareCollectionLogic
  let collection_FAKE: Collection_FAKE
  let collectionFactory_FAKE: CollectionFactory_FAKE

  const USER_ID = '12345'

  beforeEach(() => {
    jest.clearAllMocks()
    collection_FAKE = new Collection_FAKE()
    collectionFactory_FAKE = new CollectionFactory_FAKE()

    getShareCollectionLogic = new GetShareCollectionLogic(mockPrisma, collectionFactory_FAKE)

    collectionFactory_FAKE.MAKE.mockReturnValue(collection_FAKE)
  })

  it('should return collection domain values', async () => {
    const expectedCards = { collection: 'collection' }
    const expectedDetails = { details: 'details' }

    collection_FAKE.COLLECTION.mockReturnValue(expectedCards)
    collection_FAKE.DETAILS.mockReturnValue(expectedDetails)

    const result = await getShareCollectionLogic.get(USER_ID)

    expect(collectionFactory_FAKE.MAKE).toHaveBeenCalledWith(USER_ID)

    expect(result.cards).toEqual(expectedCards)
    expect(result.meta).toEqual(expectedDetails)
  })

  it('should return user name', async () => {
    const NAME = 'any name'
    mockPrisma.profile.findUnique.mockResolvedValue({
      ...makeProfileEntityMock({ name: NAME }),
    })
    const result = await getShareCollectionLogic.get(USER_ID)

    expect(result.name).toEqual(NAME)
  })
})
