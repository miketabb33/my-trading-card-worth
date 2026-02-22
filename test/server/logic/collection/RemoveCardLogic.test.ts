import RemoveCardLogic from '../../../../src/server/logic/collection/RemoveCardLogic'
import UserCardRepo_FAKE from '../../__FAKES__/UserCardRepo.fake'

describe('Remove Card Logic', () => {
  let removeCardLogic: RemoveCardLogic
  let userCardRepo_FAKE: UserCardRepo_FAKE

  const USER_ID = 'anyUserId'
  const BLUEPRINT_ID = 1234

  beforeEach(() => {
    userCardRepo_FAKE = new UserCardRepo_FAKE()
    removeCardLogic = new RemoveCardLogic(userCardRepo_FAKE)
  })

  it('should remove item by id', async () => {
    await removeCardLogic.remove(USER_ID, BLUEPRINT_ID)

    expect(userCardRepo_FAKE.REMOVE_ITEM).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
  })
})
