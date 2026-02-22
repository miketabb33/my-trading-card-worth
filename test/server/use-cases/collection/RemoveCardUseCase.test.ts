import RemoveCardUseCase from '../../../../src/server/use-cases/collection/RemoveCardUseCase'
import UserCardRepo_FAKE from '../../__FAKES__/UserCardRepo.fake'

describe('Remove Card UseCase', () => {
  let removeCardUseCase: RemoveCardUseCase
  let userCardRepo_FAKE: UserCardRepo_FAKE

  const USER_ID = 'anyUserId'
  const BLUEPRINT_ID = 1234

  beforeEach(() => {
    userCardRepo_FAKE = new UserCardRepo_FAKE()
    removeCardUseCase = new RemoveCardUseCase(userCardRepo_FAKE)
  })

  it('should remove item by id', async () => {
    await removeCardUseCase.remove(USER_ID, BLUEPRINT_ID)

    expect(userCardRepo_FAKE.REMOVE_ITEM).toHaveBeenCalledWith(USER_ID, BLUEPRINT_ID)
  })
})
