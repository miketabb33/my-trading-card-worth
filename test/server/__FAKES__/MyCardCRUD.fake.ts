import { IMyCardCRUD } from '../../../src/server/database/repository/MyCardCRUD'

class MyCardCRUD_FAKE implements IMyCardCRUD {
  CREATE = jest.fn()
  ADD_ITEM = jest.fn()
  DELETE = jest.fn()
  REMOVE_ITEM = jest.fn()
  FIND_BY_EXPANSION = jest.fn()
  FIND_BY_BLUEPRINT_ID = jest.fn()
  GET_ALL = jest.fn()

  create = this.CREATE
  addItem = this.ADD_ITEM
  delete = this.DELETE
  removeItem = this.REMOVE_ITEM
  findByExpansion = this.FIND_BY_EXPANSION
  findByBlueprintId = this.FIND_BY_BLUEPRINT_ID
  getAll = this.GET_ALL
}

export default MyCardCRUD_FAKE
