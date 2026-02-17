import { IExpansionRepo } from '../../../src/server/repository/ExpansionRepo'

class ExpansionRepo_FAKE implements IExpansionRepo {
  FIND = jest.fn()

  find = this.FIND
}

export default ExpansionRepo_FAKE
