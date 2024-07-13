import { IMyCardCRUD } from '../../../src/server/database/repository/MyCardCRUD'

class MyCardCRUD_FAKE implements IMyCardCRUD {
  ADD_MY_CARD = jest.fn()
  FIND_BY_EXPANSION = jest.fn()
  GET_ALL = jest.fn()

  add = this.ADD_MY_CARD
  findByExpansion = this.FIND_BY_EXPANSION
  getAll = this.GET_ALL
}

export default MyCardCRUD_FAKE
