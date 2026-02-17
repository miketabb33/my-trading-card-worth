import { IProfileRepo } from '../../../src/server/repository/ProfileRepo'

class ProfileRepo_FAKE implements IProfileRepo {
  CREATE = jest.fn()
  FIND = jest.fn()

  create = this.CREATE
  find = this.FIND
}

export default ProfileRepo_FAKE
