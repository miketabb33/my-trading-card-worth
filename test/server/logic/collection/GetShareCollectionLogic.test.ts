import GetShareCollectionLogic from '../../../../src/server/logic/collection/GetShareCollectionLogic'
import Collection_FAKE from '../../__FAKES__/Collection.fake'
import CollectionFactory_FAKE from '../../__FAKES__/CollectionFactory.fake'
import ProfileCRUD_FAKE from '../../__FAKES__/ProfileCRUD.fake'
import { makeProfileEntityMock } from '../../__MOCKS__/profileEntity.mock'

describe('Get Share Collection Logic', () => {
  let getShareCollectionLogic: GetShareCollectionLogic
  let collection_FAKE: Collection_FAKE
  let collectionFactory_FAKE: CollectionFactory_FAKE
  let profileCRUD_FAKE: ProfileCRUD_FAKE

  const USER_ID = '12345'

  beforeEach(() => {
    jest.clearAllMocks()
    collection_FAKE = new Collection_FAKE()
    collectionFactory_FAKE = new CollectionFactory_FAKE()
    profileCRUD_FAKE = new ProfileCRUD_FAKE()

    getShareCollectionLogic = new GetShareCollectionLogic(
      collectionFactory_FAKE,
      profileCRUD_FAKE
    )

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
    expect(result.details).toEqual(expectedDetails)
  })

  it('should return user name', async () => {
    const NAME = 'any name'
    profileCRUD_FAKE.FIND.mockReturnValue({
      ...makeProfileEntityMock({ name: NAME }),
    })
    const result = await getShareCollectionLogic.get(USER_ID)

    expect(result.name).toEqual(NAME)
  })
})
