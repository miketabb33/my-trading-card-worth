import RemoveCardLogic from '../../../../src/server/logic/collection/RemoveCardLogic'
import UserCardRepo_FAKE from '../../__FAKES__/UserCardRepo.fake'
import { makeMyCardEntityMock } from '../../__MOCKS__/myCardEntity.mock'

describe('Remove Card Logic', () => {
  let removeCardLogic: RemoveCardLogic
  let userCardRepo_FAKE: UserCardRepo_FAKE

  const USER_ID = 'anyUserId'
  const BLUEPRINT_ID = 1234

  beforeEach(() => {
    userCardRepo_FAKE = new UserCardRepo_FAKE()
    removeCardLogic = new RemoveCardLogic(userCardRepo_FAKE)
  })

  it('should delete entity when only 1 item exists', async () => {
    userCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(makeMyCardEntityMock({ items: [{ condition: 0 }] }))
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(userCardRepo_FAKE.FIND_BY_BLUEPRINT_ID).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)

    expect(userCardRepo_FAKE.DELETE).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
    expect(userCardRepo_FAKE.REMOVE_ITEM).not.toHaveBeenCalled()
  })

  it('should remove item when more than 1 item exists', async () => {
    userCardRepo_FAKE.FIND_BY_BLUEPRINT_ID.mockResolvedValue(
      makeMyCardEntityMock({ items: [{ condition: 0 }, { condition: 0 }] })
    )
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(userCardRepo_FAKE.REMOVE_ITEM).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
    expect(userCardRepo_FAKE.DELETE).not.toHaveBeenCalled()
  })
})
