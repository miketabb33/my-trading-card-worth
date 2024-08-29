import { IProfileCRUD } from '../../../src/server/database/repository/ProfileCRUD'

class ProfileCRUD_FAKE implements IProfileCRUD {
  CREATE = jest.fn()
  FIND = jest.fn()

  create = this.CREATE
  find = this.FIND
}

export default ProfileCRUD_FAKE
