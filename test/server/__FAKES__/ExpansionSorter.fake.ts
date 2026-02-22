import { IExpansionSorter } from '../../../src/server/use-cases/catalog/ExpansionSorter'

class ExpansionSorter_FAKE implements IExpansionSorter {
  SORT = jest.fn()

  sort = this.SORT
}

export default ExpansionSorter_FAKE
