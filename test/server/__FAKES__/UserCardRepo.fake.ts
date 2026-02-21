import { IUserCardRepo } from '../../../src/server/repository/UserCardRepo'

class UserCardRepo_FAKE implements IUserCardRepo {
  ADD_ITEM = jest.fn()
  DELETE = jest.fn()
  REMOVE_ITEM = jest.fn()
  FIND_BY_EXPANSION = jest.fn()
  FIND_BY_BLUEPRINT_ID = jest.fn()
  GET_ALL = jest.fn()

  addItem = this.ADD_ITEM
  delete = this.DELETE
  removeItem = this.REMOVE_ITEM
  findByExpansion = this.FIND_BY_EXPANSION
  findByBlueprintId = this.FIND_BY_BLUEPRINT_ID
  getAll = this.GET_ALL
}

export default UserCardRepo_FAKE
