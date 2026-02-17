import { IExpansionRepo } from '../../../src/server/repository/ExpansionRepo'

class ExpansionRepo_FAKE implements IExpansionRepo {
  FIND = jest.fn()
  CREATE = jest.fn()

  find = this.FIND
  create = this.CREATE
}

export default ExpansionRepo_FAKE
