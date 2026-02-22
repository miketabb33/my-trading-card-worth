import { makePrismaClientMock } from '../../__MOCKS__/prismaClient.mock'
import GetShareCollectionUseCase from '../../../../src/server/use-cases/collection/GetShareCollectionUseCase'
import Collection_FAKE from '../../__FAKES__/Collection.fake'
import CollectionFactory_FAKE from '../../__FAKES__/CollectionFactory.fake'
import { makeProfileEntityMock } from '../../__MOCKS__/profileEntity.mock'

const mockPrisma = makePrismaClientMock({ user: { findUnique: jest.fn() } })

describe('Get Share Collection UseCase', () => {
  let getShareCollectionUseCase: GetShareCollectionUseCase
  let collection_FAKE: Collection_FAKE
  let collectionFactory_FAKE: CollectionFactory_FAKE

  const USER_ID = 12345

  beforeEach(() => {
    jest.clearAllMocks()
    collection_FAKE = new Collection_FAKE()
    collectionFactory_FAKE = new CollectionFactory_FAKE()

    getShareCollectionUseCase = new GetShareCollectionUseCase(mockPrisma, collectionFactory_FAKE)

    collectionFactory_FAKE.MAKE.mockReturnValue(collection_FAKE)
    mockPrisma.user.findUnique.mockResolvedValue(makeProfileEntityMock({}))
  })

  it('should return collection domain values', async () => {
    const expectedCards = { collection: 'collection' }
    const expectedDetails = { details: 'details' }

    collection_FAKE.COLLECTION.mockReturnValue(expectedCards)
    collection_FAKE.DETAILS.mockReturnValue(expectedDetails)

    const result = await getShareCollectionUseCase.get(USER_ID)

    expect(collectionFactory_FAKE.MAKE).toHaveBeenCalledWith(USER_ID)
    expect(result.isSuccess()).toBe(true)
    expect(result.value.cards).toEqual(expectedCards)
    expect(result.value.meta).toEqual(expectedDetails)
  })

  it('should return user name', async () => {
    const NAME = 'any name'
    mockPrisma.user.findUnique.mockResolvedValue(makeProfileEntityMock({ name: NAME }))

    const result = await getShareCollectionUseCase.get(USER_ID)

    expect(result.isSuccess()).toBe(true)
    expect(result.value.name).toEqual(NAME)
  })

  it('should return failure when user is not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null)

    const result = await getShareCollectionUseCase.get(USER_ID)

    expect(result.isFailure()).toBe(true)
    expect(collectionFactory_FAKE.MAKE).not.toHaveBeenCalled()
  })
})
