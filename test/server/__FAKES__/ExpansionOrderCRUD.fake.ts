import { IExpansionOrderCRUD } from '../../../src/server/database/repository/ExpansionOrderCRUD'

class ExpansionOrderCRUD_FAKE implements IExpansionOrderCRUD {
  GET = jest.fn()

  get = this.GET
}

export default ExpansionOrderCRUD_FAKE
