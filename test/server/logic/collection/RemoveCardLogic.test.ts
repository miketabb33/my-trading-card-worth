import RemoveCardLogic from '../../../../src/server/logic/collection/RemoveCardLogic'
import MyCardRepo_FAKE from '../../__FAKES__/MyCardRepo.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Remove Card Logic', () => {
  let removeCardLogic: RemoveCardLogic
  let myCardRepo_FAKE: MyCardRepo_FAKE

  const USER_ID = 'anyUserId'
  const BLUEPRINT_ID = 1234

  beforeEach(() => {
    myCardRepo_FAKE = new MyCardRepo_FAKE()
    removeCardLogic = new RemoveCardLogic(myCardRepo_FAKE)
  })

  it('should delete entity when only 1 item exists', async () => {
    myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(makeMyCardEntityMock({ items: [{ condition: 0 }] }))
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)

    expect(myCardRepo_FAKE.DELETE).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
    expect(myCardRepo_FAKE.REMOVE_ITEM).not.toHaveBeenCalled()
  })

  it('should remove item when more than 1 item exists', async () => {
    myCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(
      makeMyCardEntityMock({ items: [{ condition: 0 }, { condition: 0 }] })
    )
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(myCardRepo_FAKE.REMOVE_ITEM).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
    expect(myCardRepo_FAKE.DELETE).not.toHaveBeenCalled()
  })
})
