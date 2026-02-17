import { IExpansionOrderRepo } from '../../../src/server/repository/ExpansionOrderRepo'

class ExpansionOrderRepo_FAKE implements IExpansionOrderRepo {
  GET = jest.fn()

  get = this.GET
}

export default ExpansionOrderRepo_FAKE
