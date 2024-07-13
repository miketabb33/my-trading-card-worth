import { IExpansionSorter } from '../../../src/server/logic/catalog/ExpansionSorter'

class ExpansionSorter_FAKE implements IExpansionSorter {
  SORT = jest.fn()

  sort = this.SORT
}

export default ExpansionSorter_FAKE
