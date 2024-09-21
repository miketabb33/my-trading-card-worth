import { IExpansionCRUD } from '../../../src/server/database/repository/ExpansionCRUD'

class ExpansionCRUD_FAKE implements IExpansionCRUD {
  FIND = jest.fn()

  find = this.FIND
}

export default ExpansionCRUD_FAKE
